import type { Metadata } from "next";

import { LegalPage } from "../_components/legal-page";
import { SUPPORT_EMAIL } from "../_lib/site";

export const metadata: Metadata = {
  title: "Delete your account — Padel Galaxio",
  description:
    "How to delete your Padel Galaxio account and data, in the app or without it.",
};

const deletionMailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Delete my Padel Galaxio account",
)}&body=${encodeURIComponent(
  "Hello,\n\nPlease delete my Padel Galaxio account and its data.\n\nThe email address of my account is: \n\nThank you.",
)}`;

const partialDeletionMailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Delete some of my data",
)}&body=${encodeURIComponent(
  "Hello,\n\nPlease delete the following data from my Padel Galaxio account:\n\n\nThe email address of my account is: \n\nThank you.",
)}`;

export default function DeleteAccountPage() {
  return (
    <LegalPage
      eyebrow="Account & data"
      title="Delete your Padel Galaxio account"
      intro="You can delete your Padel Galaxio account at any time — directly in the app, or by contacting us if you no longer have the app installed."
    >
      <h2>Option 1 — In the app (instant)</h2>
      <ul>
        <li>Open the Padel Galaxio app and sign in.</li>
        <li>
          Go to <strong>Profile → Settings → Delete account</strong>.
        </li>
        <li>Confirm. Your account is deleted immediately and you are signed out.</li>
      </ul>

      <h2>Option 2 — Without the app</h2>
      <p>
        Send an email to <a href={deletionMailto}>{SUPPORT_EMAIL}</a>{" "}
        <strong>from the email address linked to your account</strong>, with the
        subject “Delete my Padel Galaxio account”. We may ask you to confirm the
        request to make sure it comes from the account owner. We complete deletion
        requests within <strong>30 days</strong>.
      </p>
      <p>
        <a href={deletionMailto}>Send a deletion request by email →</a>
      </p>

      <h2>What is deleted</h2>
      <ul>
        <li>Your name, profile photo, cover photo and phone number.</li>
        <li>Your stories.</li>
        <li>
          Your sign-in: your email address is removed from your account and you can
          no longer sign in.
        </li>
      </ul>

      <h2>What is kept</h2>
      <ul>
        <li>
          <strong>Match results and rankings</strong> you took part in, because other
          players’ scores and rankings depend on them. They are shown as “Deleted
          user” and no longer linked to your name or photo.
        </li>
        <li>
          <strong>Messages you already sent</strong> remain visible to the people you
          sent them to, shown as from “Deleted user”.
        </li>
        <li>
          Information we must keep for legal or security reasons (for example
          reports of abusive behaviour), only for as long as required.
        </li>
      </ul>

      <h2>Delete some of your data without deleting your account</h2>
      <p>You can remove specific data at any time and keep your account:</p>
      <ul>
        <li>
          <strong>In the app:</strong> delete your stories and posts, remove or change
          your profile and cover photo, and clear your optional details (phone number,
          height, weight) from <strong>Profile → Edit profile</strong>.
        </li>
        <li>
          <strong>By email:</strong> to remove other specific data (for example
          particular messages, photos or match media), email{" "}
          <a href={partialDeletionMailto}>{SUPPORT_EMAIL}</a> from the address linked
          to your account, with the subject “Delete some of my data”, and describe
          what you want removed. We’ll process the request within{" "}
          <strong>30 days</strong>.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>
        Contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. See
        also our <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
