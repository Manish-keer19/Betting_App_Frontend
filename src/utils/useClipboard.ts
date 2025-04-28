import { useState } from 'react';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text:any) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (err) {
            console.error('Fallback copy failed: ', err);
          }
          document.body.removeChild(textarea);
        });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed: ', err);
      }
      document.body.removeChild(textarea);
    }
  };

  return [copied, copyToClipboard];
};