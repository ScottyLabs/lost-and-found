import MainLayout from 'components/layout/MainLayout';

export default function PoliciesPage() {
  return (
    <MainLayout>
      <div className="prose">
        <h1>Policies</h1>

        <h2>General</h2>
        <p>
          All Carnegie Mellon students, faculty, staff, and guests, are
          responsible for the security of their property; Carnegie Mellon
          accepts no responsibility for lost or stolen items while on Carnegie
          Mellon&apos;s on campus property, non-campus property, and adjacent
          public property, including all recognized Carnegie Mellon events.
        </p>
        <p>
          When made known through designated “lost and found” locations,
          Carnegie Mellon University will make a reasonable effort to return
          lost/abandoned property to its owner.
        </p>
        <p>
          Carnegie Mellon University complies with all applicable laws
          pertaining to lost/abandoned property.
        </p>

        <h2>Item Categorization</h2>
        <p>
          Carnegie Mellon University categorizes lost/abandoned property as
          follows:
        </p>
        <ul>
          <li>
            Identifiable Property — Any item(s) that is believed to belong to a
            specific and identifiable individual
          </li>
          <li>
            Unidentifiable Property — Any item(s) with no ability to associate
            to a specific and identifiable individual
          </li>
          <li>
            High-Value Items — Any cash and jewelry with an estimated value over
            $50. Additionally, any item with an estimated value over $500
          </li>
          <li>
            General Items — Any item not considered a “High-Value” item, that
            still maintains some level of monetary value
          </li>
        </ul>

        <h2>Procedures</h2>
        <h3>Procedures for Lost/Abandoned Property*:</h3>
        <ul>
          <li>
            <h4>High Value Items</h4>
            <ul>
              <li>
                Identifiable and unidentifiable property will be turned over to
                the Carnegie Mellon University Police Department (CMUPD) once
                received. High value items will not be listed on CMU&apos;s
                public “lost and found” website.
              </li>
              <li>
                If identifiable, the owner will be contacted and the property
                will be held by CMUPD for a period of 3 years before being
                turned over to the Pennsylvania State Treasurer.
              </li>
              <li>
                If not identifiable, the property will be held by CMUPD for a
                period of 1 year before being turned over to the Pennsylvania
                State Treasurer.
              </li>
            </ul>
          </li>
          <li>
            <h4>General Items</h4>
            <ul>
              <li>
                Identifiable property will be held at the Cohon University
                Center Information Desk. The owner will be notified and the
                property will be held for a minimum of 90 days.
              </li>
              <li>
                Unidentifiable property will be documented via a public “lost
                and found” website, and the property will be held for a minimum
                of 90 days.
              </li>
              <li>
                If unclaimed, all property may be donated, given away, and/or
                discarded.
              </li>
            </ul>
          </li>
          <li>
            <h4>Returning Property</h4>
            <ul>
              <li>
                Anyone claiming property must present a CMU or government issued
                ID to verify identity, which will be recorded.
              </li>
              <li>
                Anyone claiming property may be asked to take further steps to
                verify their ownership.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          *Water bottles and any such items which may carry bodily fluids will
          not be accepted.
        </p>
      </div>
    </MainLayout>
  );
}
