import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contacts"
      className="
        w-full 
        flex flex-col md:flex-row 
        items-start justify-between 
        bg-gray-50 
        rounded-2xl shadow-md 
        p-8 md:p-12 
        overflow-hidden
      "
    >
      {/* Left: Contact Info (1 part) */}
      <div className="flex-1 text-left space-y-4 md:pr-4">
        <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>

        <div className="space-y-2 text-lg text-gray-700 ">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:bytebytego@vcet.edu.in"
              className="text-blue-600 hover:underline"
            >
              bytebytego@vcet.edu.in
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:9999999999" className="text-blue-600 hover:underline">
              99999-99999
            </a>
          </p>
          <p>
            <strong>Address:</strong> Vivekanand College of Engineering & Technology, Puttur
          </p>
        </div>
      </div>

      {/* Middle: Spacer (0.2 part) */}
      <div className="hidden md:block flex-[0.2]" />

      {/* Right: Google Map (2 parts) */}
      <div className="flex-[2] w-full md:w-auto">
        <iframe
          title="VCET Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.484694112703!2d74.73958327501964!3d12.758502987553384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba355b2742f8a3f%3A0xa2f2a3c6e31ec88b!2sVivekananda%20College%20of%20Engineering%20%26%20Technology%2C%20Puttur!5e0!3m2!1sen!2sin!4v1731324800000!5m2!1sen!2sin"
          width="500"
          height="350"
          allowFullScreen=""
          loading="lazy"
          className="rounded-xl border border-gray-300 shadow-sm w-full"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactSection;
