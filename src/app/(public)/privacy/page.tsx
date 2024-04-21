import { Typography } from "@/components/ui/typography";
import { Footer } from "../_components/footer";

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <Typography component="h1">Privacy Policy</Typography>
      <Typography>Last updated: [Date]</Typography>

      <Typography>
        Welcome to [Your SaaS App Name], provided by [Your Company Name]
        (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed
        to protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you visit our mobile
        application and our website [insert website URL]. Please read this
        privacy policy carefully. If you do not agree with the terms of this
        privacy policy, please do not access the application.
      </Typography>

      <Typography component="h2" className="mt-4">
        Information We Collect
      </Typography>

      <Typography component="h3">Personal Data</Typography>
      <Typography>
        Personal Data is information that can be used to identify you
        specifically, including but not limited to, your name, email address,
        telephone number, and demographic information.
      </Typography>

      <Typography component="h3">Derivative Data</Typography>
      <Typography>
        Derivative data is information that our servers automatically collect
        when you access our application, such as your IP address, browser type,
        operating system, access times, and the pages you have viewed directly
        before and after accessing the app.
      </Typography>

      <Typography component="h3">Financial Data</Typography>
      <Typography>
        Financial information, such as data related to your payment method (e.g.
        valid credit card number, card brand, expiration date) that we may
        collect when you purchase, order, return, exchange, or request
        information about our services from the app.
      </Typography>

      <Typography component="h2" className="mt-4">
        Use of Your Information
      </Typography>
      <Typography>
        We use collected information via our application for various purposes,
        including:
      </Typography>
      <ul className="list-disc">
        <li>To create and manage your account.</li>
        <li>To process your transactions.</li>
        <li>To send administrative information.</li>
        <li>To enforce our terms, conditions, and policies.</li>
        <li>To respond to legal requests and prevent harm.</li>
      </ul>

      <Typography component="h2" className="mt-4">
        Disclosure of Your Information
      </Typography>
      <Typography>
        We may share information we have collected about you in certain
        situations. Your information may be disclosed as follows:
      </Typography>

      <Typography component="h3">By Law or to Protect Rights</Typography>
      <Typography>
        If we believe the release of information about you is necessary to
        respond to legal process, to investigate or remedy potential violations
        of our policies, or to protect the rights, property, and safety of
        others, we may share your information as permitted or required by any
        applicable law, rule, or regulation.
      </Typography>

      <Typography component="h3">Third-Party Service Providers</Typography>
      <Typography>
        We may share your data with third parties that perform services for us
        or on our behalf, including payment processing, data analysis, email
        delivery, hosting services, customer service, and marketing assistance.
      </Typography>

      <Typography component="h3">Business Transfers</Typography>
      <Typography>
        We may share or transfer your information in connection with, or during
        negotiations of, any merger, sale of company assets, financing, or
        acquisition of all or a portion of our business to another company.
      </Typography>

      <Typography component="h2" className="mt-4">
        Security of Your Information
      </Typography>
      <Typography>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </Typography>

      <Typography component="h2" className="mt-4">
        Contact Us
      </Typography>
      <Typography>
        If you have questions or comments about this Privacy Policy, please
        contact us at:
      </Typography>
      <Typography>[Your Company Name]</Typography>
      <Typography>[Your Company Address]</Typography>
      <Typography>[Email Address]</Typography>
      <Typography>[Telephone Number]</Typography>

      <Footer />
    </div>
  );
}
