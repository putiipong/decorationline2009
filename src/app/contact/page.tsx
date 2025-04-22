"use client";

// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   ChatBubbleLeftRightIcon,
// } from "@heroicons/react/24/solid";

// const Contact = () => {
//   return (
//     <section className="bg-primary py-16 px-6 md:px-16 flex justify-center items-center min-h-screen">
//       <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12 text-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2 uppercase">
//           DECORATION LINE 2009 LIMITED PARTNERSHIP
//         </h1>
//         <p className="text-base md:text-lg text-gray-700 mb-8">ติดต่อเรา</p>

//         <div className="space-y-6 text-secondary">
//           {/* Phone */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 text-sm md:text-base">
//             <PhoneIcon className="text-secondary h-6 w-6 mx-auto sm:mx-0" />
//             <p>063-421-9781 , 089-663-9782</p>
//           </div>

//           {/* Email */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 text-sm md:text-base">
//             <EnvelopeIcon className="text-secondary h-6 w-6 mx-auto sm:mx-0" />
//             <p>d.line2009@hotmail.com</p>
//           </div>

//           {/* Line */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 text-sm md:text-base">
//             <ChatBubbleLeftRightIcon className="text-secondary h-6 w-6 mx-auto sm:mx-0" />
//             <p>Line: @530alyhn</p>
//           </div>

//           {/* Address */}
//           <div className="flex flex-col sm:flex-row sm:items-start justify-center gap-2 text-sm md:text-base">
//             <MapPinIcon className="text-secondary h-6 w-6 mx-auto sm:mx-0" />
//             <p className="text-center sm:text-left">
//               339/51 ถนน บางกรวย-ไทรน้อย ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const Contact = () => {
  return (
    <section className="bg-primary px-6 md:px-16 py-16">
      <p className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 pt-14 text-xl md:text-3xl font-bold text-secondary">
        CONTACT US
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-10">
        <div className="w-full md:w-1/2 md:ml-20 flex flex-col items-center md:items-start mb-10 md:mb-0 md:pr-12">
          <h1 className="text-xl font-bold text-secondary mb-4 uppercase text-center md:text-left">
            DECORATION LINE 2009 LIMITED PARTNERSHIP
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-4 text-center md:text-left">
            ติดต่อเรา
          </p>

          <div className="space-y-6 text-secondary w-full max-w-md">
            <div className="flex items-start gap-3">
              <PhoneIcon className="text-secondary h-6 w-6" />
              <div>
                <a
                  href="tel:0634219781"
                  className="block text-secondary hover:text-gray-700 transition"
                >
                  063-421-9781
                </a>
                <a
                  href="tel:0896639782"
                  className="block text-secondary hover:text-gray-700 transition"
                >
                  089-663-9782
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <EnvelopeIcon className="text-secondary h-6 w-6" />
              <p>d.line2009@hotmail.com</p>
            </div>

            <div className="flex items-start gap-3">
              <ChatBubbleLeftRightIcon className="text-secondary h-6 w-6" />
              <p>Line: @530alyhn</p>
            </div>

            <div className="flex items-start gap-3">
              <MapPinIcon className="text-secondary h-6 w-6" />
              <p>
                339/51 ถนน บางกรวย-ไทรน้อย ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี
                11110
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs">
            <Image
              src="/line_oa_chat_680422_230033_group_0.png" // Replace this with your actual QR code image path
              alt="LINE QR Code"
              width={300}
              height={300}
              className="rounded"
              priority
            />
            <p className="text-center text-sm text-gray-600 mt-4">
              สแกนเพื่อแอด LINE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
