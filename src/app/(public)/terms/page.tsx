import { Typography } from "@/components/ui/typography";
import { Footer } from "../_components/footer";

export default function TermsPage() {
  return (
    <div className="pt-16">
      <Typography component="h1">Terms of Service</Typography>
      <Typography>Last updated: [Date]</Typography>

      <Typography>
        Please read these terms of service (&ldquo;terms&ldquo;, &ldquo;terms of
        service&ldquo;) carefully before using [Your Website or Application
        Name] website or app (the &ldquo;service&ldquo;) operated by [Your
        Company Name] (&ldquo;us&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;).
      </Typography>

      <Typography component="h2" className="mt-4">
        Conditions of Use
      </Typography>
      <Typography>
        We will provide their services to you, which are subject to the
        conditions stated below in this document. Every time you visit this
        website, use its services, or make a purchase, you accept the following
        conditions. This is why we urge you to read them carefully.
      </Typography>

      <Typography component="h2" className="mt-4">
        Privacy Policy
      </Typography>
      <Typography>
        Before you continue using our website, we advise you to read our privacy
        policy regarding our user data collection. It will help you better
        understand our practices.
      </Typography>

      <Typography component="h2" className="mt-4">
        Copyright
      </Typography>
      <Typography>
        All content published and made available on our site is the property of
        [Your Company Name] and its creators. This includes, but is not limited
        to images, text, logos, documents, downloadable files, and anything that
        contributes to the composition of our site.
      </Typography>

      <Typography component="h2" className="mt-4">
        Communications
      </Typography>
      <Typography>
        The entire communication with us is electronic. Every time you send us
        an email or visit our website, you are going to be communicating with
        us. You hereby consent to receive communications from us. If you
        subscribe to the news on our website, you are going to receive regular
        emails from us. We will continue to communicate with you by posting news
        and notices on our website and by sending you emails. You also agree
        that all notices, disclosures, agreements, and other communications we
        provide to you electronically meet the legal requirements that such
        communications be in writing.
      </Typography>

      <Typography component="h2" className="mt-4">
        Applicable Law
      </Typography>
      <Typography>
        By visiting this website, you agree that the laws of [Your
        State/Country], without regard to principles of conflict laws, will
        govern these terms of service, or any dispute of any sort that might
        come between [Your Company Name] and you, or its business partners and
        associates.
      </Typography>

      <Typography component="h2" className="mt-4">
        Disputes
      </Typography>
      <Typography>
        Any dispute related in any way to your visit to this website or to
        products you purchase from us shall be arbitrated by state or federal
        court [Your Location] and you consent to exclusive jurisdiction and
        venue of such courts.
      </Typography>

      <Typography component="h2" className="mt-4">
        License and Site Access
      </Typography>
      <Typography>
        We grant you a limited license to access and make personal use of this
        website. You are not allowed to download or modify it. This may be done
        only with written consent from us.
      </Typography>

      <Typography component="h2" className="mt-4">
        User Account
      </Typography>
      <Typography>
        If you are an owner of an account on this website, you are solely
        responsible for maintaining the confidentiality of your private user
        details (username and password). You are responsible for all activities
        that occur under your account or password.
      </Typography>

      <Typography component="h2" className="mt-4">
        Amendments to Terms
      </Typography>
      <Typography>
        We reserve the right to amend these terms at any time. When we do, we
        will revise the updated date at the top of this page.
      </Typography>

      <Typography>
        Your continued use of the Website following the posting of updated Terms
        of Service will mean that you agree to those changes.
      </Typography>

      <Footer />
    </div>
  );
}
