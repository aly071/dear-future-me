import {
    Html, Body, Container, Heading,
    Text, Button, Hr, Section
  } from '@react-email/components'
  
  interface Props {
    message:      string
    nickname?:    string
    title?:       string
    color:        string
    stickers:     string[]
    writtenDate:  string
    viewUrl:      string
  }
  
  export default function LetterDelivery({
    message, nickname, title, color, stickers, writtenDate, viewUrl
  }: Props) {
    return (
      <Html>
        <Body style={{ background: '#fdf6ec', fontFamily: 'Georgia, serif', padding: '40px 0' }}>
          <Container style={{
            maxWidth: '560px', margin: '0 auto',
            background: '#fffdf7', border: '1px solid #f5e6c8',
            borderRadius: '2px', overflow: 'hidden',
          }}>
  
            {/* Color accent bar */}
            <Section style={{ background: color, padding: '12px 0' }} />
  
            <Section style={{ padding: '48px' }}>
  
              <Text style={{ fontSize: '13px', color: '#888', letterSpacing: '2px',
                textTransform: 'uppercase', marginBottom: '24px' }}>
                A letter from your past self
              </Text>
  
              <Heading style={{ fontSize: '28px', color: '#2c1a0e',
                fontStyle: 'italic', marginBottom: '8px' }}>
                {title || 'Dear Future Me'}
              </Heading>
  
              <Text style={{ fontSize: '12px', color: '#888', marginBottom: '32px' }}>
                Written on {writtenDate}
              </Text>
  
              {/* Stickers */}
              {stickers.length > 0 && (
                <Text style={{ fontSize: '24px', marginBottom: '24px', letterSpacing: '4px' }}>
                  {stickers.join(' ')}
                </Text>
              )}
  
              <Hr style={{ borderColor: '#f5e6c8', margin: '24px 0' }} />
  
              {/* Salutation */}
              <Text style={{ fontSize: '20px', color: '#2c1a0e',
                fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
                Dear future {nickname || 'me'},
              </Text>
  
              {/* Letter body */}
              <Text style={{ fontSize: '16px', color: '#2c1a0e', lineHeight: '1.9',
                fontFamily: 'Georgia, serif', whiteSpace: 'pre-wrap' }}>
                {message}
              </Text>
  
              <Hr style={{ borderColor: '#f5e6c8', margin: '32px 0' }} />
  
              {/* Sign off */}
              <Text style={{ fontSize: '16px', color: '#5c3d2e',
                fontStyle: 'italic', marginBottom: '32px' }}>
                With love,<br />
                your past self ✦
              </Text>
  
              {/* View online button */}
              <Section style={{ textAlign: 'center' }}>
                <Button href={viewUrl} style={{
                  background: '#2c1a0e', color: '#fdf6ec',
                  padding: '12px 28px', borderRadius: '2px',
                  fontSize: '14px', textDecoration: 'none',
                }}>
                  View this letter online
                </Button>
              </Section>
  
            </Section>
  
            {/* Footer */}
            <Section style={{ background: '#f5e6c8', padding: '16px 48px' }}>
              <Text style={{ fontSize: '11px', color: '#888', margin: 0 }}>
                — Dear Future Me ✦ · You wrote this to yourself
              </Text>
            </Section>
  
          </Container>
        </Body>
      </Html>
    )
  }