(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id).scrollIntoView({behavior:'smooth'});
    });
  });
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const inbox = JSON.parse(localStorage.getItem('wyclose_inbox')||'[]');
      inbox.push({...data, ts: Date.now()});
      localStorage.setItem('wyclose_inbox', JSON.stringify(inbox));
      document.getElementById('formStatus').textContent = 'Mensagem registrada!';
      form.reset();
    });
  }
  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});
  }
})();