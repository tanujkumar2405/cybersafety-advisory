// contact.js - handles the contact form behavior (no backend)
export function initContactForm(){
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const clearBtn = document.getElementById('clear-form');

  if(!form) return;

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    feedback.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(!name || !message){
      showFeedback('Please provide your name and a brief description.', 'error');
      return;
    }

    // Basic sanitization: ensure user didn't paste secrets
    if(message.match(/otp|one-time|password|pass|pin|cvv|ssn/i)){
      showFeedback('Do not include OTPs, passwords, or payment details in your message.', 'error');
      return;
    }

    // Simulate send (no backend). We intentionally do not send data anywhere.
    showFeedback('Thanks — we received your advisory request. We will reply if we can.', 'success');
    form.reset();
  });

  clearBtn?.addEventListener('click', ()=>{
    form.reset();
    feedback.textContent = '';
  });

  function showFeedback(msg, type='info'){
    feedback.textContent = msg;
    feedback.className = type === 'error' ? 'feedback error' : 'feedback success';
    // small auto-hide for success
    if(type === 'success') setTimeout(()=>{ feedback.textContent = ''; feedback.className = ''; }, 7000);
  }
}
