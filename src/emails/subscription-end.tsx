import { Category } from '@prisma/client';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { Categories } from 'types';

const baseUrl = process.env.DEPLOY_URL;

export type EndProps = {
  previewText?: string;
  category: Category;
};

export function EndEmail({ previewText = '', category }: EndProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white px-2 font-sans">
          <Container className="my-[40px] mx-auto max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section>
              <Row>
                <Column className="flex items-center space-x-8 font-semibold">
                  <Img
                    src={`${baseUrl}/logo.png`}
                    width="42"
                    height="42"
                    alt="Lost and Found Logo"
                  />
                  <Text>CMU Lost and Found</Text>
                </Column>
              </Row>
            </Section>
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/LostandFoundHeader.png`}
                alt="Lost and Found"
                height={225}
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
              Subscription End
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              You subscription to the category{' '}
              <span className="font-semibold">{Categories[category]}</span> has
              now ended.
            </Text>

            <Hr className="my-[26px] mx-0 w-full border border-solid border-[#eaeaea]" />

            <Section className="mt-[20px] text-center">
              <Text className="leading-[6px] text-[#1F4C4C]">
                <a
                  href="https://lostandfound.andrew.cmu.edu"
                  className="text-[#1F4C4C] underline"
                >
                  lostandfound.andrew.cmu.edu
                </a>
              </Text>
              <Text className="leading-[6px] text-[#1F4C4C]">
                Powered by{' '}
                <a
                  href="https://scottylabs.org"
                  className="text-[#1F4C4C] underline"
                >
                  ScottyLabs &lt;3
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
