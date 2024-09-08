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

type Props = {
  previewText?: string;
  category?: Category;
  items?: Item[];
  baseUrl?: string;
  username?: string;
};
export default function Email({
  previewText = '',
  category,
  items,
  baseUrl,
  username
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white px-2 font-sans">
          <Container className="my-[40px] mx-auto max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
              Subscription Update
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Daily updates for the category{' '}
              <span className="font-semibold">{category}</span> are ready.
            </Text>

            <Section>
              {items?.map((item) => (
                <Row key={item.id}>
                  <Column align="right">
                    <Text>
                      Item Name:{' '}
                      <span className="font-semibold">{item.name}</span>
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text>
                      Description:{' '}
                      <span className="font-semibold">{item.itemLocation}</span>
                    </Text>
                  </Column>
                  <Column align="right">
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
