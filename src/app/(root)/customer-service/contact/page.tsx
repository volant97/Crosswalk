import React from 'react';
import Page from '@/components/layout/Page';
import ContactPage from '@/components/customer-service/contact/Contact';

function Contact() {
  return (
    <Page noNavBar noBackMain noNotiBell>
      <ContactPage />
    </Page>
  );
}

export default Contact;
