import MainLayout from 'components/Layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const contributors = [
  'Richard Guo (Project Lead)',
  'Elizabeth Louie (Project Lead)',
  'Jackie Yang (Project Lead)',
  'Michael Crotty',
  'Daniel Gunawan',
  'Brian Lee',
  'Victoria Lee',
  'Cathy Li',
  'Michelle Li',
  'Yerim Song',
  'Clara Wang',
  'Rachel Wei',
  'Gabriel Hall'
];

const About: NextPageWithLayout = () => (
  <div className="prose">
    <h1>About This Site</h1>
    <p>
      This website displays information about lost items registered with all the
      lost and found centers on campus. Users can browse through items and get
      information about where and when it was found, and where they can retrieve
      it.
    </p>

    <h2>Mission Statement</h2>
    <p>
      There are many lost and found centers scattered throughout campus. As
      there is little communication between these centers, students often have
      to visit multiple locations to find their lost item. This website seeks to
      fix this problem by providing a digital interface that compiles all the
      lost items on campus in one location.
    </p>

    <h2>Contributors</h2>
    <ul className="columns-2">
      {contributors.map((contributor) => (
        <li key={contributor}>{contributor}</li>
      ))}
    </ul>
  </div>
);

About.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default About;
