import MainLayout from 'components/Layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const Policies: NextPageWithLayout = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-medium mb-1">Lost & Found Policies</h1>
      <p className="text-sm text-gray-500 mb-10">
        Cohon University Center — Carnegie Mellon University
      </p>
 
      <section className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
          General
        </h2>
        <div className="border-l-2 border-gray-200 pl-4 space-y-3 text-sm leading-relaxed text-gray-700">
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
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
          Item categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "Identifiable property",
              desc: "Can be associated with a specific individual",
            },
            {
              title: "Unidentifiable property",
              desc: "No way to associate with a specific individual",
            },
            {
              title: "High-value items",
              desc: "Cash/jewelry over $50, or any item over $500",
            },
            {
              title: "General items",
              desc: "Items with monetary value not classified as high-value",
            },
            {
              title: "Beverage containers",
              desc: "Reusable water bottles, coffee mugs, etc.",
            },
            {
              title: "CMU ID cards",
              desc: "Student and staff identification cards",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium mb-0.5">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      
      <section className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
          Procedures
        </h2>
        <div className="space-y-2">
          {[
            {
              title: "High-value items",
              meta: "CMUPD",
              items: [
                "Turned over to CMUPD. Not listed on the public lost and found website.",
                <><strong>Identifiable:</strong> Owner contacted; held for <strong>3 years</strong> before transfer to PA State Treasurer.</>,
                <><strong>Unidentifiable:</strong> Held for <strong>1 year</strong> before transfer to PA State Treasurer.</>,
              ],
            },
            {
              title: "General items",
              meta: "Cohon Info Desk",
              items: [
                <><strong>Identifiable:</strong> Held at the Cohon University Center Information Desk; owner notified; held for a minimum of <strong>90 days</strong>.</>,
                <><strong>Unidentifiable:</strong> Listed on the public lost and found website; held for a minimum of <strong>90 days</strong>.</>,
                "Unclaimed items may be donated, given away, or discarded.",
              ],
            },
            {
              title: "Beverage containers",
              meta: "1-week hold",
              items: [
                "Emptied of all contents upon intake.",
                <>Held for <strong>1 week</strong>, then discarded.</>,
              ],
            },
            {
              title: "CMU ID cards",
              meta: "Info Desk → The HUB",
              items: [
                <>Held at the Information Desk for a minimum of <strong>1 week</strong>; owner is contacted.</>,
                "Cards unclaimed after 1 week are returned to The HUB.",
                "Cards found inside a wallet, phone case, or other personal property are not returned to The HUB separately.",
              ],
            },
            {
              title: "Claiming property",
              meta: "ID required",
              items: [
                "A valid CMU or government-issued ID must be presented and will be recorded.",
                "Additional steps to verify ownership may be required.",
              ],
            },
          ].map(({ title, meta, items }) => (
            <details
              key={title}
              className="border border-gray-200 rounded-lg overflow-hidden group"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none">
                {title}
                <span className="text-xs font-normal text-gray-400">{meta}</span>
              </summary>
              <div className="border-t border-gray-100 px-5 py-4">
                <ul className="text-sm text-gray-600 leading-relaxed space-y-1.5 list-disc list-inside">
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
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
          Items not accepted
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          The Cohon Center will not accept the following:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Items that may carry bodily fluids",
            "Wet, dirty, or soiled items",
            "Undergarments (underwear, socks, bras, bathing suits)",
            "Towels, pillows, sheets, and other bedding",
            "Toiletries, makeup, chemicals, or detergents",
            "Food, containers with food, or perishable items",
            "Weapons, including knives with blades over 6 inches",
            "Any item deemed unsanitary or hazardous by CUC staff",
          ].map((item) => (
            <div
              key={item}
              className="text-xs text-red-700 bg-red-50 rounded-md px-3 py-2"
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
