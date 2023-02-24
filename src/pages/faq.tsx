/* eslint-disable jsx-a11y/label-has-associated-control */
import MainLayout from 'components/layout/MainLayout';
import { SubscribeModal } from 'components/SubscribeModal';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const FAQ: Record<string, ReactNode> = {
  'Where do I go to retrieve my item?': (
    <div className="prose">
      The Lost & Found help desk is available at the information desk in the{' '}
      <Link href="/found">Cohon University Center (CUC)</Link>, please carry
      your government or student ID when you go.
    </div>
  ),
  "Why can't I find my item?": (
    <div className="prose">
      <h4>
        High Value Items (cash and jewelry over $50 or items valued at more than
        $500):
      </h4>
      <ul>
        <li>
          These items are not displayed on our website due to security reasons,
          please contact the <Link href="/found">CUC Information Desk</Link>.
        </li>
      </ul>
      <h4>Identifiable Property (e.g. Student IDs or Wallets)</h4>
      <ul>
        <li>
          The owner is contacted directly, and items will not appear on the Lost
          & Found website.
        </li>
      </ul>
      <h4>Website Update Frequency</h4>
      <ul>
        <li>
          Items are added at the end of the day, check back on the site to see
          if it has been added or{' '}
          <label htmlFor="subscribe-modal" className="link">
            subscribe
          </label>{' '}
          for daily updates.
        </li>
      </ul>
    </div>
  ),
  'How often are items added to the website?': (
    <div className="prose">
      Items are added to the website at the end of the day they are received.
    </div>
  ),
  'How long are items held for?': (
    <div className="prose">
      Items are held for a minimum of 90 days by the Lost & Found. Items that
      are deemed to be high value are held by the CMU Police Department for 1
      year. High value items that are identifiable are held for 3 years.
    </div>
  ),
  'How do I subscribe/unsubscribe from item updates?': (
    <div className="prose">
      Click{' '}
      <label htmlFor="subscribe-modal" className="link">
        here
      </label>{' '}
      to subscribe or unsubscribe from item updates.
    </div>
  ),
  'Where do I share some feedback?': (
    <div className="prose">
      To leave feedback, please fill out this{' '}
      <Link href="https://forms.gle/QDnNyjdzUBnFUkno8">form</Link>.
    </div>
  )
};

export default function FAQPage() {
  return (
    <>
      <SubscribeModal />
      <MainLayout>
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
            {Object.entries(FAQ).map(([question, answer]) => (
              <div key={question}>
                <div className="collapse-arrow rounded-box collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-bold">
                    {question}
                  </div>
                  <div className="collapse-content">
                    <p>{answer}</p>
                  </div>
                </div>
                <div className="divider my-1" />
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
