"use client";

import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

const Contact = () => {
  return (
    <section className="bg-[#f9f8e8] py-24 px-6 md:px-16 h-screen flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          DECORATION LINE 2009 LIMITED PARTNERSHIP
        </h1>
        <p className="text-lg text-gray-600 mb-6">ติดต่อเรา</p>

        <div className="space-y-4 text-gray-700">
          {/* Phone */}
          <div className="flex items-center justify-center space-x-2">
            <PhoneIcon className="text-yellow-600 h-6 w-6" />
            <p>063-421-9781 , 089-663-9782</p>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center space-x-2">
            <EnvelopeIcon className="text-yellow-600 h-6 w-6" />
            <p>d.line2009@hotmail.com</p>
          </div>

          {/* Line */}
          <div className="flex items-center justify-center space-x-2">
            <ChatBubbleLeftRightIcon className="text-yellow-600 h-6 w-6" />
            <p>@530alyhn</p>
          </div>

          {/* Address */}
          <div className="flex items-center justify-center space-x-2 text-center">
            <MapPinIcon className="text-yellow-600 h-6 w-6" />
            <p>
              339/51 ถนน บางกรวย-ไทรน้อย ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี
              11110
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
