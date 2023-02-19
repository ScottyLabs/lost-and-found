import MainLayout from 'components/layout/MainLayout';
import Image from 'next/image';

const FAQ: Record<string, string> = {
  'Where do I go to retrieve my item?':
    'A found item can be taken to the Information Desk at the Cohon University Center.',
  "Why can't I find my item?":
    'We are not responsible for lost items. Please contact the CMU Police Department at 412-268-2323 for assistance.',
  'How long are items held for?':
    'Items are held for 30 days. After 30 days, items are donated to charity.',
  'How do I subscribe/unsubscribe from item updates?':
    'You can subscribe/unsubscribe from item updates by clicking the "Subscribe" button on the home page.',
  'Where do I share some feedback?':
    'You can share some feedback by clicking the "Feedback" button on the home page.',
  'Want to learn more about creators?':
    'You can learn more about the creators by clicking the "About" button on the home page.'
};

export default function FAQPage() {
  return (
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
        <div className="w-full max-w-xl">
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
  );
}
