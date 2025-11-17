// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FiUser, FiMail, FiLock, FiArrowRight, FiCheck } from "react-icons/fi";
// import React from "react";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     length: false,
//     uppercase: false,
//     number: false,
//     specialChar: false,
//   });
  
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Check password strength
//     if (name === 'password') {
//       setPasswordStrength({
//         length: value.length >= 8,
//         uppercase: /[A-Z]/.test(value),
//         number: /[0-9]/.test(value),
//         specialChar: /[^A-Za-z0-9]/.test(value),
//       });
//     }
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return false;
//     }
    
//     // Check if all password requirements are met
//     const allRequirementsMet = Object.values(passwordStrength).every(Boolean);
//     if (!allRequirementsMet) {
//       toast.error("Please meet all password requirements");
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setLoading(true);
    
//     try {
//       const { data } = await axios.post("https://bookingservice-1-csg6.onrender.com/auth/register", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password
//       });

//       if (data.success) {
//         toast.success("Registration successful! Please log in.");
//         navigate("/login");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const PasswordRequirement = ({ met, text }) => (
//     <li className="flex items-center">
//       {met ? (
//         <FiCheck className="text-green-500 mr-2" />
//       ) : (
//         <span className="w-5 h-5 border border-gray-300 rounded-full mr-2 flex items-center justify-center text-transparent">•</span>
//       )}
//       <span className={met ? "text-gray-600" : "text-gray-400"}>{text}</span>
//     </li>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
//               <p className="text-gray-600 mt-2">Join us today!</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Username"
//                     required
//                     minLength={3}
//                     maxLength={30}
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email address"
//                     required
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Create a password"
//                     required
//                     minLength={8}
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm password"
//                     required
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">Password must contain:</h4>
//                   <ul className="space-y-1 text-sm text-gray-600">
//                     <PasswordRequirement met={passwordStrength.length} text="At least 8 characters" />
//                     <PasswordRequirement met={passwordStrength.uppercase} text="At least one uppercase letter" />
//                     <PasswordRequirement met={passwordStrength.number} text="At least one number" />
//                     <PasswordRequirement met={passwordStrength.specialChar} text="At least one special character" />
//                   </ul>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating account...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     Create Account <FiArrowRight className="ml-2" />
//                   </span>
//                 )}
//               </button>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   <span className="sr-only">Sign up with Google</span>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
//                   </svg>
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   <span className="sr-only">Sign up with GitHub</span>
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiCheck, 
  FiEye, 
  FiEyeOff 
} from "react-icons/fi";
import React from "react";

export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);       // 👈 NEW
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 NEW

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[^A-Za-z0-9]/.test(value),
      });
    }
  };


  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    const allRequirementsMet = Object.values(passwordStrength).every(Boolean);
    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://bookingservice-1-csg6.onrender.com/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      );

      if (data.success) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";

      toast.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };


  const PasswordRequirement = ({ met, text }) => (
    <li className="flex items-center">
      {met ? (
        <FiCheck className="text-green-500 mr-2" />
      ) : (
        <span className="w-5 h-5 border border-gray-300 rounded-full mr-2 flex items-center justify-center text-transparent">•</span>
      )}
      <span className={met ? "text-gray-600" : "text-gray-400"}>{text}</span>
    </li>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
              <p className="text-gray-600 mt-2">Join us today!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-4">

                {/* Username */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    minLength={3}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* Password + Eye */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>


                {/* Confirm Password + Eye */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>


                {/* Password Strength Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Password must contain:</h4>

                  <ul className="space-y-1 text-sm">
                    <PasswordRequirement met={passwordStrength.length} text="At least 8 characters" />
                    <PasswordRequirement met={passwordStrength.uppercase} text="At least one uppercase letter" />
                    <PasswordRequirement met={passwordStrength.number} text="At least one number" />
                    <PasswordRequirement met={passwordStrength.specialChar} text="At least one special character" />
                  </ul>
                </div>

              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373
                          0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                          3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Create Account <FiArrowRight className="ml-2" />
                  </span>
                )}
              </button>

            </form>


            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600">
                  Sign in
                </Link>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
