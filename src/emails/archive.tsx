import { Item } from '@prisma/client';
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

type Props = {
  items: Item[];
};

export function ArchiveEmail({ items }: Props) {
  return (
    <Html>
      <Head />
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
            <Text className="text-[14px] leading-[24px] text-black">
              Hello,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              The following items have been in inventory for over 30 days.
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
                      <span className="font-semibold">{item.itemLocation}</span>
                    </Text>
                  </Column>
                  <Column align="right" className="w-1/3 pr-[8px]">
                    <Text>
                      Location:{' '}
                      <span className="font-semibold">
                        {item.shortDescription}
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
