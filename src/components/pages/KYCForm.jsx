import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { authContext } from "../Global/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../assets/Spinner";
import Back from "../Global/Back";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Too short")
    .required("Full name is required"),

  dob: Yup.date()
    .required("Date of birth is required"),

  aadhaar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar must contain exactly 12 digits")
    .required("Aadhaar number is required"),

  emergencyName: Yup.string()
    .required("Emergency contact number is required"),

  emergencyPhone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
    .required("Emergency contact is required"),

  address: Yup.string()
    .min(10, "Enter complete address")
    .required("Address is required"),

  aadhaarFront: Yup.mixed()
    .required("Upload Aadhaar front"),

  aadhaarBack: Yup.mixed()
    .required("Upload Aadhaar back"),

  consent: Yup.boolean()
    .oneOf([true], "You must agree before submitting"),
});

 function KYCForm() {
  //  const {loading, setLoading} = useContext(authContext)

  const [loading, setLoading] = useState(false)
  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center px-5 py-10">


      <Formik
        initialValues={{
          fullName: "",
          dob: "",
          aadhar: "",
          emergencyName: "",
          emergencyPhone: "",
          address: "",
          aadhaarFront: null,
          aadhaarBack: null,
          consent: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, {resetForm, isSubmitting}) => {
          //  const formData = new FormData()
             try {
                 setLoading(true)

                 const formData = new FormData();
                   formData.append("fullName", values.fullName);
                   formData.append("dob", values.dob);
                   formData.append("aadhar", values.aadhaar);
                   formData.append("emergencyName", values.emergencyName);
                   formData.append("emergencyPhone", values.emergencyPhone);
                   formData.append("address", values.address);
                   formData.append("consent", values.consent);
                   formData.append("aadharFront", values.aadhaarFront); // File object
                   formData.append("aadharBack", values.aadhaarBack);

                  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/kyc`, formData, {withCredentials: true})
                    if(res){

                      toast.success(res?.data?.message || "Form Submitted")
                       resetForm()
                    } else {
                      toast.error(res?.data?.message || "failed to submit form")
                      setLoading(false)
                    }
             } catch (error) {
               console.log("ERROR: ",error)
                toast.error(`Internal Server Error`)
                setLoading(false)
             }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (

          <Form className="w-full max-w-3xl bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-2xl space-y-6">

<Back />

            <div>
              <h1 className="text-3xl font-bold text-white">
                Volunteer KYC
              </h1>

              <p className="text-zinc-400 mt-2">
                Verify your identity to volunteer for events.
                Your documents are securely reviewed before approval.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-zinc-300 text-sm">
                  Full Name
                </label>

                <Field
                  name="fullName"
                  className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-violet-500"
                />

                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-zinc-300 text-sm">
                  Date of Birth
                </label>

                <Field
                  type="date"
                  name="dob"
                  className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-violet-500"
                />

                <ErrorMessage
                  name="dob"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

            </div>

            <div>
              <label className="text-zinc-300 text-sm">
                Aadhaar Number
              </label>

              <Field
                name="aadhaar"
                maxLength={12}
                className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-violet-500"
              />

              <ErrorMessage
                name="aadhaar"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-zinc-300 text-sm">
                  Aadhaar Front
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFieldValue(
                      "aadhaarFront",
                      e.currentTarget.files[0]
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-dashed border-zinc-700 bg-zinc-950 p-3"
                />

                <ErrorMessage
                  name="aadhaarFront"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-zinc-300 text-sm">
                  Aadhaar Back
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFieldValue(
                      "aadhaarBack",
                      e.currentTarget.files[0]
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-dashed border-zinc-700 bg-zinc-950 p-3"
                />

                <ErrorMessage
                  name="aadhaarBack"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-zinc-300 text-sm">
                  Emergency Contact
                </label>

                <Field
                  name="emergencyName"
                  className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3"
                />

                <ErrorMessage
                  name="emergencyName"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-zinc-300 text-sm">
                  Contact Number
                </label>

                <Field
                  name="emergencyPhone"
                  className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3"
                />

                <ErrorMessage
                  name="emergencyPhone"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

            </div>

            <div>
              <label className="text-zinc-300 text-sm">
                Address
              </label>

              <Field
                as="textarea"
                rows="3"
                name="address"
                className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 resize-none"
              />

              <ErrorMessage
                name="address"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-zinc-400">

              <Field
                type="checkbox"
                name="consent"
                className="mt-1"
              />

              <span>
                I confirm that the information provided is correct.
                I understand Apex may verify my identity before
                approving my volunteer account.
              </span>

            </label>

            <ErrorMessage
              name="consent"
              component="p"
              className="text-red-400 text-xs"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg hover:bg-violet-500 bg-violet-600 cursor-pointer transition font-semibold flex justify-center items-center cursor-pointer${
                 loading? "disabled:bg-zinc-500" : "bg-violet-600"
              }`}>
              {loading? <Spinner size="md"/> : "Submit"}
            </button>

          </Form>

        )}
      </Formik>

    </div>
  );
}

export default KYCForm;