"use client";

// import Image from "next/image";

// const services = [
//   {
//     title: "Architectural Design",
//     description:
//       "We provide comprehensive architectural services, combining aesthetics and functionality to bring your vision to life.",
//     image:
//       "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
//   },
//   {
//     title: "Interior Design",
//     description:
//       "Our team crafts sophisticated and comfortable interior environments that reflect your lifestyle and preferences.",
//     image:
//       "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
//   },
//   {
//     title: "Construction & Renovation",
//     description:
//       "We execute construction and renovation projects with precision, ensuring quality and timely completion.",
//     image:
//       "https://images.pexels.com/photos/209230/pexels-photo-209230.jpeg",
//   },
//   {
//     title: "General Contracting",
//     description:
//       "Our experienced contractors handle all aspects of your project, from planning to execution.",
//     image:
//       "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg",
//   },
//   {
//     title: "Project Management",
//     description:
//       "Effective project management ensures your project stays on track, within budget, and exceeds expectations.",
//     image:
//       "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
//   },
//   {
//     title: "Custom Furniture & Fit-Out",
//     description:
//       "We create custom furniture and interior fit-outs tailored to your space and style.",
//     image:
//       "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
//   },
// ];

// const ServicesPage = () => {
//   return (
//     <section className="bg-white text-black py-20 px-6 md:px-16">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-2">Our Services</h1>
//         <p className="text-gray-600 text-lg">
//           Full-spectrum design and construction solutions tailored for you.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <Image
//               src={service.image}
//               alt={service.title}
//               width={600}
//               height={400}
//               className="w-full h-60 object-cover"
//             />
//             <div className="p-6">
//               <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {service.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ServicesPage;
import Image from "next/image";

const services = [
  {
    title: "Construction Services",
    subtitle: "By Decoration Line 2009",
    description:
      "Comprehensive construction and contracting solutions for residential and commercial projects.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Interior Design",
    subtitle: "✕ 25 Celsius Design",
    description:
      "Personalized and innovative interior design services to bring out the best in your space.",
    image:
      "https://drive.google.com/uc?export=view&id=13WMf1AfnvYK7GuoArrVZ1i5gvEWgiOc9",
  },
  {
    title: "Exterior Design",
    subtitle: "✕ 25 Celsius Design",
    description:
      "Creative outdoor and facade design that enhances the aesthetics and value of your property.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Renovation & Custom Build",
    subtitle: "By Decoration Line 2009",
    description:
      "Tailored renovation and custom building solutions to upgrade your current space.",
    image:
      "https://drive.google.com/uc?export=view&id=13WMf1AfnvYK7GuoArrVZ1i5gvEWgiOc9",
  },
  {
    title: "Turnkey Project",
    description:
      "We provide full-service turnkey solutions from design and construction to complete handover. A hassle-free experience tailored to your vision.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // รูปภาพโทนโมเดิร์นเรียบหรูที่สื่อถึง turnkey
  },
];

const OurServices = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <h1 className="text-4xl font-bold text-black text-center my-12">Our Services</h1>
      <div className="grid gap-12 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gray-100 rounded-xl overflow-hidden shadow-md"
          >
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
            </div>
            <div className="p-6 w-full md:w-1/2">
              <h2 className="text-xl font-bold text-black mb-1">{service.title}</h2>
              <h3 className="text-md text-gray-600 mb-2">{service.subtitle}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;