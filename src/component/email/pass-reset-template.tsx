import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "react-email";
import Logo from "../shared/logo";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export const ResetPasswordEmail = ({
  name,
  resetUrl,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-slate-50 my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded-xl my-[40px] mx-auto p-[20px] w-[465px] bg-white shadow-sm">
            {/* Placeholder for your logo */}
            <Logo />

            <Section className="px-[20px]">
              <Text className="text-black text-[24px] font-semibold p-0 my-[30px] mx-0 text-center">
                Reset your password
              </Text>
              <Text className="text-slate-600 text-[14px] leading-[24px]">
                Hello {name},
              </Text>
              <Text className="text-slate-600 text-[14px] leading-[24px]">
                We received a request to reset your account password. If you
                didn't make this request, you can safely ignore this email.
              </Text>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded-lg text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={resetUrl}
                >
                  Reset Password
                </Button>
              </Section>

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

              <Text className="text-[#666666] text-[12px] leading-[24px] text-center italic">
                This link will expire in 1 hour. If you have any trouble, please
                reach out to our support team.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
