import React from 'react'
import ContactForm from './ContactForm'
import Feedback from '../pages/Feedback'

export default function ContactAndFeedback() {
  return (
    <section
      className=" bg-gray-900  px-6 py-5"
      id="contact-feedback-wrapper"
    >
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <ContactForm id="contact" />
        </div>

        <div>
          <Feedback id="feedback" />
        </div>
      </div>
    </section>
  );
}
