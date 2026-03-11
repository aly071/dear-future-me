import {
    Html, Body, Container, Heading,
    Text, Button, Hr, Section
  } from '@react-email/components'
  
  interface Props {
    verifyUrl:    string
    cancelUrl:    string
    deliveryDate: string
  }
  
  export default function VerificationEmail({ verifyUrl, cancelUrl, deliveryDate }: Props) {
    return (
      <Html>
        <Body style={{ background: '#fdf6ec', fontFamily: 'Georgia, serif', padding: '40px 0' }}>
          <Container style={{
            maxWidth: '520px', margin: '0 auto',
            background: '#fffdf7', border: '1px solid #f5e6c8',
            borderRadius: '2px', padding: '48px',
          }}>
            <Heading style={{ fontSize: '32px', color: '#2c1a0e', fontStyle: 'italic', marginBottom: '8px' }}>
              ✉️ Confirm your letter
            </Heading>
  
            <Text style={{ color: '#5c3d2e', lineHeight: '1.8', fontSize: '16px' }}>
              Your letter to your future self is ready to be sealed.
              It will be delivered on <strong>{deliveryDate}</strong>.
            </Text>
  
            <Text style={{ color: '#5c3d2e', lineHeight: '1.8', fontSize: '16px' }}>
              Click the button below to confirm your email and schedule delivery.
            </Text>
  
            <Section style={{ textAlign: 'center', margin: '32px 0' }}>
              <Button href={verifyUrl} style={{
                background: '#2c1a0e', color: '#fdf6ec',
                padding: '14px 32px', borderRadius: '2px',
                fontSize: '16px', fontFamily: 'Georgia, serif',
                textDecoration: 'none',
              }}>
                Seal my letter ✦
              </Button>
            </Section>
  
            <Hr style={{ borderColor: '#f5e6c8', margin: '24px 0' }} />
  
            <Text style={{ fontSize: '12px', color: '#888', lineHeight: '1.6' }}>
              Changed your mind?{' '}
              <a href={cancelUrl} style={{ color: '#d4856a' }}>Cancel this letter</a>
              {' '}and it will never be sent.
            </Text>
  
            <Text style={{ fontSize: '11px', color: '#aaa', marginTop: '16px' }}>
              — Dear Future Me ✦
            </Text>
          </Container>
        </Body>
      </Html>
    )
  }