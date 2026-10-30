/* Programme detail page: verified social proof + review carousel. */
(function(){
  const proof=document.querySelector('[data-programme-proof]');
  if(proof){
    const rating=Number(proof.dataset.rating);
    const ratingCount=parseInt(proof.dataset.ratingCount,10);
    const recommendations=parseInt(proof.dataset.recommendations,10);
    if(Number.isFinite(rating)&&rating>0&&rating<=5&&Number.isFinite(ratingCount)&&ratingCount>0){
      const item=proof.querySelector('[data-rating-item]');
      item.hidden=false;
      proof.querySelector('[data-rating-value]').textContent=rating.toFixed(1)+' / 5';
      proof.querySelector('[data-rating-count-value]').textContent=ratingCount;
      proof.querySelector('[data-rating-stars]').textContent='★'.repeat(Math.round(rating))+'☆'.repeat(5-Math.round(rating));
    }
    if(Number.isInteger(recommendations)&&recommendations>0){
      proof.querySelector('[data-recommendations-item]').hidden=false;
      proof.querySelector('[data-recommendations-value]').textContent=recommendations.toLocaleString('en-IN');
    }
    proof.hidden=proof.querySelectorAll('.pd-proof-item:not([hidden])').length===0;
  }
  document.querySelectorAll('[data-review-track]').forEach(track=>{
    const section=track.closest('.pd-review-section');
    const prev=section?.querySelector('[data-review-prev]');
    const next=section?.querySelector('[data-review-next]');
    const move=direction=>track.scrollBy({left:direction*Math.max(track.clientWidth*.82,280),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    prev?.addEventListener('click',()=>move(-1));
    next?.addEventListener('click',()=>move(1));
  });
})();
