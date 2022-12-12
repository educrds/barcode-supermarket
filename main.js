const textScan = document.getElementById('text-scan');
const camScan = document.getElementById('scan');
const clickBtn = document.getElementById('click');

clickBtn.addEventListener('click', showCam);

function showCam(e) {
  e.preventDefault();
  Quagga.init(
    {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.getElementById('scan'), // Or '#yourElement' (optional)
      },
      decoder: {
        readers: ['code_128_reader'],
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      camScan.style.display = 'block';
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    }
  );
}

Quagga.onDetected((data) => {
  if (data) {
    textScan.innerHTML = data.codeResult.code;
    camScan.style.display = 'none';
    console.log(data);
    Quagga.stop();
  }
});
