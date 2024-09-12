import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from '@react-email/components';

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp}: VerificationEmailProps) {
    return (
        <Html lang='en' dir='ltr'>
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as='h2'>Hyalo, {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thanks for signing up! Here&apos;s your verification code:
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
            </Section>
            <Button href='https://example.com/verify'>Verify</Button>
        </Html>
    )
}