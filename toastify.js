import { toast } from 'react-toastify';


const errorToast = (error) =>  toast.error(`❎ ${error}`, {
    position: "top-center",
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: true,
  })
  
const successToast = (success) =>  toast.success(`👍 ${success}`, {
    position: "top-center",
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: true,
})

const cartToast = (info) =>  toast.info(`${info}`, {
  position: "bottom-right",
  autoClose: 4000,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
  theme:"dark"
})

  export {errorToast, successToast, cartToast};