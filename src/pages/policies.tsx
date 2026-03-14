import MainLayout from 'components/Layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const Policies: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-2xl py-8 px-4">
      <h1 className="mb-1 text-3xl font-medium">Lost & Found Policies</h1>
      <p className="mb-10 text-sm text-gray-500">
        Cohon University Center — Carnegie Mellon University
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
          General
        </h2>
        <div className="space-y-3 border-l-2 border-gray-200 pl-4 text-sm leading-relaxed text-gray-700">
          <p>
            All Carnegie Mellon students, faculty, staff, and guests are
            responsible for the security of their property. CMU accepts no
            responsibility for lost or stolen items on campus, non-campus, or
            adjacent public property, including at recognized CMU events.
          </p>
          <p>
            When made known through designated &ldquo;lost and found&rdquo;
            locations, the university will make a reasonable effort to return
            lost or abandoned property to its owner.
          </p>
          <p>
            Carnegie Mellon complies with all applicable laws pertaining to lost
            and abandoned property.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
          Item categories
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Identifiable property',
              desc: 'Can be associated with a specific individual'
            },
            {
              title: 'Unidentifiable property',
              desc: 'No way to associate with a specific individual'
            },
            {
              title: 'High-value items',
              desc: 'Cash/jewelry over $50, or any item over $500'
            },
            {
              title: 'General items',
              desc: 'Items with monetary value not classified as high-value'
            },
            {
              title: 'Beverage containers',
              desc: 'Reusable water bottles, coffee mugs, etc.'
            },
            {
              title: 'CMU ID cards',
              desc: 'Student and staff identification cards'
            }
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg bg-gray-50 p-3">
              <p className="mb-0.5 text-sm font-medium">{title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
          Procedures
        </h2>
        <div className="space-y-2">
          {[
            {
              title: 'High-value items',
              meta: 'CMUPD',
              items: [
                'Turned over to CMUPD. Not listed on the public lost and found website.',
                <>
                  <strong>Identifiable:</strong> Owner contacted; held for{' '}
                  <strong>3 years</strong> before transfer to PA State
                  Treasurer.
                </>,
                <>
                  <strong>Unidentifiable:</strong> Held for{' '}
                  <strong>1 year</strong> before transfer to PA State Treasurer.
                </>
              ]
            },
            {
              title: 'General items',
              meta: 'Cohon Info Desk',
              items: [
                <>
                  <strong>Identifiable:</strong> Held at the Cohon University
                  Center Information Desk; owner notified; held for a minimum of{' '}
                  <strong>90 days</strong>.
                </>,
                <>
                  <strong>Unidentifiable:</strong> Listed on the public lost and
                  found website; held for a minimum of <strong>90 days</strong>.
                </>,
                'Unclaimed items may be donated, given away, or discarded.'
              ]
            },
            {
              title: 'Beverage containers',
              meta: '1-week hold',
              items: [
                'Emptied of all contents upon intake.',
                <>
                  Held for <strong>1 week</strong>, then discarded.
                </>
              ]
            },
            {
              title: 'CMU ID cards',
              meta: 'Info Desk → The HUB',
              items: [
                <>
                  Held at the Information Desk for a minimum of{' '}
                  <strong>1 week</strong>; owner is contacted.
                </>,
                'Cards unclaimed after 1 week are returned to The HUB.',
                'Cards found inside a wallet, phone case, or other personal property are not returned to The HUB separately.'
              ]
            },
            {
              title: 'Claiming property',
              meta: 'ID required',
              items: [
                'A valid CMU or government-issued ID must be presented and will be recorded.',
                'Additional steps to verify ownership may be required.'
              ]
            }
          ].map(({ title, meta, items }) => (
            <details
              key={title}
              className="group overflow-hidden rounded-lg border border-gray-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium">
                {title}
                <span className="text-xs font-normal text-gray-400">
                  {meta}
                </span>
              </summary>
              <div className="border-t border-gray-100 px-5 py-4">
                <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-gray-600">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
          Items not accepted
        </h2>
        <p className="mb-3 text-sm text-gray-500">
          The Cohon Center will not accept the following:
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            'Items that may carry bodily fluids',
            'Wet, dirty, or soiled items',
            'Undergarments (underwear, socks, bras, bathing suits)',
            'Towels, pillows, sheets, and other bedding',
            'Toiletries, makeup, chemicals, or detergents',
            'Food, containers with food, or perishable items',
            'Weapons, including knives with blades over 6 inches',
            'Any item deemed unsanitary or hazardous by CUC staff'
          ].map((item) => (
            <div
              key={item}
              className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

Policies.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Policies;
