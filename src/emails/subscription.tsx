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
import { Categories, Locations } from 'types';

export type Props = {
  previewText?: string;
  category: Category;
  items: Item[];
};

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
                    src="../../public/logo.svg"
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
                src="LostandFoundHeader.png"
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
                <Row key={item.id}>
                  <Column align="right" className="w-1/3 pl-[8px]">
                    <Text>
                      Item Name:{' '}
                      <span className="font-semibold">{item.name}</span>
                    </Text>
                  </Column>
                  <Column align="right" className="w-1/3 px-[8px]">
                    <Text>
                      Description:{' '}
                      <span className="font-semibold">
                        {item.shortDescription}
                      </span>
                    </Text>
                  </Column>
                  <Column align="right" className="w-1/3 pr-[8px]">
                    <Text>
                      Location Found:{' '}
                      <span className="font-semibold">
                        {Locations[item.foundLocation]}
                      </span>
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Hr className="my-[26px] mx-0 w-full border border-solid border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
