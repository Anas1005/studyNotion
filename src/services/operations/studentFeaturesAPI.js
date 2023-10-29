// import toast from "react-hot-toast";
// import { endpoints } from "../apis";
// import { apiConnector } from "../apiConnectors";
// import { clearCart } from "../../slices/cartSlice";

// const {
//   COURSE_PAYMENT_API,
//   PAYMENT_VERIFY_API,
//   SEND_PAYMENT_SUCCESS_EMAIL_API,
// } = endpoints;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(fasle);
//     };

//     document.body.appendChild(script);
//   });
// }

// export async function buyCourse(courses, user, token, navigate, dispatch) {
//   RAZORPAY_KEY = "rzp_test_d76wqr49t1Qlm0" ;
//   const toastID = toast.loading("Loading....");
//   try {
//     const res = await loadScript("https://checkout.razorpay.com/checkout.js");

//     if (!res) {
//       toast.error("RazorPay SDK failed to load");
//       return;
//     }

//     // Initiate the Order....
//     const orderResponse = await apiConnector(
//       "POST",
//       COURSE_PAYMENT_API,
//       {
//         Authorization: `Bearer ${token}`,
//       },
//       null,
//       dispatch
//     );
//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message);
//     }

//     // Creating Options...........

//     const options = {
//       key: RAZORPAY_KEY,
//       currency: orderResponse.data.message.currency,
//       amount: orderResponse.data.message.amount,
//       name: "Study Notion",
//       description: "Thank You For Purchasing the Course",
//       image: "https://source.unsplash.com/random/100x100?user1",
//       prefill: {
//         name: user.firstName,
//         email: user.email,
//       },
//       handler: function (response) {
//         // Send Suvessful mail
//         sendPaymentSuccessEmail(
//           response,
//           orderResponse.data.message.amount,
//           token,
//           dispatch
//         );

//         verifyPayment({ ...response, courses }, token, navigate, dispatch);
//       },
//     };
//   } catch (e) {
//     console.log("PAYMENT API ERROE...");
//     toast.error("Could not make Payment");
//   }
//   toast.dismiss(toastID);
// }

// async function sendPaymentSuccessEmail(response, amount, token, dispatch) {
//   const toastID = toast.loading("Sending Payment Sucess Email...");
//   try {
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         orderID: response.razorpay_order_id,
//         paymentID: response.razorpay_payment_id,
//         amount,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       },
//       null,
//       dispatch
//     );
//   } catch (e) {
//     console.log(e);
//     console.log("Payment Sucess Email could not be sent...");
//   }
//   toast.dismiss(toastID);
// }

// async function verifyPayment(bodyData, token, naviagte, dispatch) {
//   const toastID = toast.loading("Verifying Payment....");

//   try {
//     const response = await apiConnector(
//       "POST",
//       PAYMENT_VERIFY_API,
//       bodyData,
//       {
//         Authorization: `Bearer ${token}`,
//       },
//       null,
//       dispatch
//     );

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }

//     toast.success("Payment Sucessfull, You are enrolled to the Course");
//     naviagte("/dashboard/enrolled-courses");
//     dispatch(clearCart());
//   } catch (e) {
//     console.log(e);
//     console.log("Payment Could not be Verified");
//     toast.error(e.message);
//   }
//   toast.dismiss(toastID);
// }


import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnectors";
import { clearCart, removeFromCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  PAYMENT_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = endpoints;

const RAZORPAY_KEY = "rzp_test_25vnwe7SSUmHnE";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
        toast.success("Script Loaded");
      resolve(true);
    };
    script.onerror = (e) => {
     console.log(e)
      
      resolve(false);
    };

    document.body.appendChild(script);
  })
}

export async function createOrder(courses, user, token, navigate, dispatch,cart) {
  const toastID = toast.loading("Loading....");
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {courses},
      {
        Authorization: `Bearer ${token}`,
      },
      null,
      dispatch
    );
    console.log("OrderRes:",orderResponse.data)

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log("OrderResssssssssssssssss");

    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: orderResponse.data.message.amount,
      order_id:orderResponse.data.message.id,
      name: "Study Notion",
      description: "Thank You For Purchasing the Course",
      image: "https://source.unsplash.com/random/100x100?user1",
      prefill: {
        name: user.firstName,
        email: user.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token,
          dispatch
        );

        verifyPayment({ ...response, courses }, token, navigate, dispatch,cart);
      },
    };

    console.log("OrderResssssssssssssssss22222");

    const razorpay = new window.Razorpay(options);
    console.log(options);
    
    razorpay.open();
    console.log("OrderRessssssssssssssss44444444444s");
  } catch (e) {
    console.log(e);
    console.log("OrderResssssssssssssssss555555555555");
    toast.error("Could not Create an Order..");
  }
  toast.dismiss(toastID);
}

async function sendPaymentSuccessEmail(response, amount, token, dispatch) {
  const toastID = toast.loading("Sending Payment Success Email...");
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderID: response.razorpay_order_id,
        paymentID: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      },
      null,
      dispatch
    );
    console.log("Kya he bole ab??????")
    toast.success("Email Sent Successfully....")
  } catch (e) {
    console.log(e);
    console.log("Payment Success Email could not be sent...");
  }
  
  toast.dismiss(toastID);

}

async function verifyPayment(bodyData, token, navigate, dispatch,cart) {
  const toastID = toast.loading("Verifying Payment....");

  try {
    const response = await apiConnector(
      "POST",
      PAYMENT_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
      dispatch
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Verified, You are enrolled in the Course");
    navigate("/dashboard/enrolled-courses");

    if(bodyData.courses.length>1){
      toast.success("Cart se Buy Kiye hai",bodyData.courses.length)
     dispatch(clearCart());
    }
    else {
      if(cart.some((cartCourse)=>cartCourse._id===bodyData.courses[0])){
        dispatch(removeFromCart(bodyData.courses[0]))
        toast.success("Cart se rrmoved",bodyData.courses.length)
      }
      else{
      toast.success("Cart me tha he nahi....",bodyData.courses.length)
      }
    }

  } catch (e) {
    console.log(e);
    console.log("Payment Could not be Verified");
    toast.error(e.message);
  }
  toast.dismiss(toastID);
}
