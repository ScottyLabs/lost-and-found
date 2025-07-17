import { Category, Item } from '@prisma/client';
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

export type Props = {
  previewText?: string;
  category: Category;
  items: Item[];
};

const baseUrl = process.env.DEPLOY_URL;

export function Email({ previewText = '', category, items }: Props) {
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
              Subscription Update
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Daily updates for the category{' '}
              <span className="font-semibold">{Categories[category]}</span> are
              ready.
            </Text>

            <Section>
              {items?.map((item) => (
                <div key={item.id}>
                  <Row className="mb-[0px] pb-[0px]">
                    <Column align="left" className="w-1 pl-[8px]">
                      <Text className="leading-[0px] text-[#7B9E94]">
                        <span className="font-bold">{item.name}</span>
                      </Text>
                    </Column>
                  </Row>
                  <Row className="my-[0px] py-[0px]">
                    <Column align="left" className="w-1/3 pl-[8px]">
                      <Text className="font-semibold leading-[0px]">
                        Date Found:{' '}
                        <span className="font-normal">
                          {`${(item.foundDate.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/` +
                            `${item.foundDate
                              .getDate()
                              .toString()
                              .padStart(2, '0')}/` +
                            `${item.foundDate.getFullYear()}`}
                        </span>
                      </Text>
                    </Column>
                    <Column align="left" className="w-1/3 px-[8px]">
                      <Text className="font-semibold leading-[0px]">
                        Location Found:{' '}
                        <span className="font-normal">{item.itemLocation}</span>
                      </Text>
                    </Column>
                    <Column align="left" className="w-1/3 pr-[8px]">
                      <Text className="font-semibold leading-[0px]">
                        Color:{' '}
                        <span className="font-normal">
                          {item.shortDescription}
                        </span>
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mt-[0px] mb-[14px]">
                    <Column align="left" className="w-1 pl-[8px]">
                      <Text className="font-semibold leading-[0px]">
                        Description:{' '}
                        <span className="font-normal">
                          {item.shortDescription}
                        </span>
                      </Text>
                    </Column>
                  </Row>
                </div>
              ))}
            </Section>

            <Text className="font-normal">
              Want to unsubscribe? Return to our website and delete your
              subscription.
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
