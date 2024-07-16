---
title: "riceset"
---

<div style="text-align: center; padding: 0 20px;">
  <img src="media/index/icon.png" alt="icon" width="150" />
  <div style="font-size: 24px; margin-top: 20px;">
    Komeno
  </div>
  <p style="margin-top: 20px;">
    Software engineer at École 42 Paris, based in Tokyo. Student at Tokyo University of Foreign Studies, majoring in international Japan studies. Passionate about iPhone app development and language learning.
  </p>
  <br>
  <p class="languages">
    🇯🇵 C2 / 🇬🇧 C2 / 🇵🇹 C2 / 🇪🇸 B2 / 🇹🇼 B1 / 🇫🇷 A1 / 🇰🇷 A1
  </p>

</div>

<style>
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  body > div {
    width: fit-content;
    max-width: 100%;
    box-sizing: border-box;
  }
  .languages {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .languages span {
    margin-right: 5px;
  }
  @media (max-width: 600px) {
    .image-container {
      flex-direction: column;
    }
    .image-container img {
      margin-bottom: 10px;
    }
    .languages {
      display: block;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const languages = document.querySelector('.languages');
    const languagesText = languages.innerHTML.split('/');
    languages.innerHTML = '';
    languagesText.forEach((lang, index) => {
      languages.innerHTML += `<span>${lang.trim()}</span>`;
      if (index < languagesText.length - 1) {
        languages.innerHTML += ' / ';
      }
    });
  });
</script>
