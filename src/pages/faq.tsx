import MainLayout from 'components/Layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import useDialogStore from 'stores/DialogStore';
import { NextPageWithLayout } from './_app';

const Questions: Record<string, () => ReactNode> = {
  'Where do I go to retrieve my item?': () => (
    <div className="prose">
      The Lost & Found help desk is available at the information desk in the{' '}
      <Link href="/found">Cohon University Center (CUC)</Link>, please carry
      your government or student ID when you go.
    </div>
  ),
  "Why can't I find my item?": () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { subscribeDialog } = useDialogStore();

    return (
      <div className="prose">
        <h4>
          High Value Items (cash and jewelry over $50 or items valued at more
          than $500):
        </h4>
        <ul>
          <li>
            These items are not displayed on our website due to security
            reasons, please contact the{' '}
            <Link href="/found">CUC Information Desk</Link>.
          </li>
        </ul>
        <h4>Identifiable Property (e.g. Student IDs or Wallets)</h4>
        <ul>
          <li>
            The owner is contacted directly, and items will not appear on the
            Lost & Found website.
          </li>
        </ul>
        <h4>Website Update Frequency</h4>
        <ul>
          <li>
            Items are added at the end of the day, check back on the site to see
            if it has been added or {' '} 
            <button type="button" onClick={subscribeDialog} className="link" style={{margin:0 + 'em'}}>
              subscribe
            </button>{' '}
            for daily updates.
          </li>
        </ul>
      </div>
    );
  },
  'How often are items added to the website?': () => (
    <div className="prose">
      Items are added to the website within 24 hours of receipt.
    </div>
  ),
  'How long are items held for?': () => (
    <div className="prose">
      Items are held for a minimum of 90 days by the Lost & Found. Items that
      are deemed to be high value are held by the CMU Police Department for 1
      year. High value items that are identifiable are held for 3 years.
    </div>
  ),
  'How do I subscribe/unsubscribe from item updates?': () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { subscribeDialog } = useDialogStore();

    return (
      <div className="prose">
        Click{' '}
        <button type="button" onClick={subscribeDialog} className="link">
          here
        </button>{' '}
        to subscribe or unsubscribe from item updates.
      </div>
    );
  },
  'Where do I share some feedback?': () => (
    <div className="prose">
      To leave feedback, please fill out this{' '}
      <Link href="https://forms.gle/QDnNyjdzUBnFUkno8">form</Link>.
    </div>
  ),
  'Want to learn more about the creators?': () => (
    <div className="prose">
      We’re a part of Scotty Labs, a student organization at Carnegie Mellon
      University who develop applications and services for the campus community.
      Learn more about us <Link href="https://scottylabs.org">here</Link>.
    </div>
  ),
  'Still need more information?': () => (
    <div className="prose">
      Here&apos;s a link to our <Link href="/policy">Policy Page</Link>.
    </div>
  )
};

const FAQ: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-row items-center gap-4">
        <div className="relative h-14 w-14">
          <Image src="/question.svg" fill alt="" />
        </div>
        <div className="text-lg font-bold md:text-2xl">
          Have Questions? We&apos;ve got the answers below.
        </div>
      </div>
      <div className="w-full max-w-2xl">
        {Object.entries(Questions).map(([question, answer]) => (
          <div key={question}>
            <div className="collapse-arrow rounded-box collapse">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-bold">{question}</div>
              <div className="collapse-content">{answer()}</div>
            </div>
            <div className="divider my-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

FAQ.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default FAQ;
