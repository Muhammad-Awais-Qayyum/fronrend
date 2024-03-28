import React, { FC, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../styles/style";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [inavlidError, setInvalidError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

  useEffect(() => {
    if (isSuccess) {
      const message = "Account activated successfully!";
      toast.success(message);
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        setInvalidError(true);

        const errorData = error as any;
        toast.error(errorData?.data.message);
      } else {
        console.log("An error occured", error);
      }
    }
  }, [error, isSuccess, setRoute]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
      setInvalidError(false);
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setInvalidError(true);
      setOtp(Array(4).fill(""));
      inputRefs.current[0]?.focus();
      return;
    }
    await activation({
      activation_token: token,
      activation_code: enteredOtp,
    });
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex justify-center items-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex justify-around">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            className={` w-[65px] h-[65px] bg-transparent border-[3px]
             rounded-[10px] flex items-center text-black dark:text-white 
              justify-center text-[18px] font-Poppins outline-none text-center ${
                inavlidError
                  ? " shake  border-red-500"
                  : " border-black dark:border-white"
              }          
            `}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className=" w-full justify-center flex">
        <button className={`${styles.button}`} onClick={handleSubmit}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className=" text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?
        <span
          className=" text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
