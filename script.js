// ======================
// MENU
// ======================


function toggleMenu(){
  const menu = document.querySelector(".menu");

  menu.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

function openForm(){

  document
    .getElementById("popupForm")
    .classList.add("active");
}

function closeForm(){

  document
    .getElementById("popupForm")
    .classList.remove("active");
}


// ======================
// POPUP FORM
// ======================


function openSuccessPopup(){

  document
    .getElementById("successPopup")
    .classList.add("active");
}

function closeSuccessPopup(){

  document
    .getElementById("successPopup")
    .classList.remove("active");
}

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});


// ======================
// SUBMIT FORM
// ======================

document.getElementById("daftarForm").addEventListener("submit", async function(e){

	const submitBtn = document.getElementById("submitBtn");

	submitBtn.disabled = true;
	submitBtn.innerHTML = "Mengirim...";
	submitBtn.style.opacity = "0.7";
	submitBtn.style.cursor = "not-allowed";


  e.preventDefault();

  const file = document.getElementById("foto").files[0];

  const sendData = async (fotoBase64 = "") => {

    const data = {
      nama: document.getElementById("nama").value,
      namaPanggilan: document.getElementById("namaPanggilan").value,
      tempatLahir: document.getElementById("tempatLahir").value,
      tanggalLahir: document.getElementById("tanggalLahir").value,
      email: document.getElementById("email").value,
      nohp: document.getElementById("nohp").value,
      alamat: document.getElementById("alamat").value,
      jenisKelamin: document.getElementById("jenisKelamin").value,
      foto: fotoBase64
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzrX8LAclhQ70PpgHt1_wi1TXAqyr6FDPRgGrThkZQ_iy-cMAqf5omU-4VlHjYzgAJA/exec", {
  method: "POST",

  body: JSON.stringify(data)
});

const result = await response.json();

if (result.status === "success") {
	submitBtn.disabled = false;
	submitBtn.innerHTML = "Kirim Pendaftaran";
	submitBtn.style.opacity = "1";
	submitBtn.style.cursor = "pointer";

        openSuccessPopup();
        closeForm();

        document.getElementById("daftarForm").reset();

      } else {
        submitBtn.disabled = false;
  	submitBtn.innerHTML = "Kirim Pendaftaran";
  	submitBtn.style.opacity = "1";
  	submitBtn.style.cursor = "pointer";

 	 alert("Gagal: " + result.message);
      }

    } catch (err) {
	submitBtn.disabled = false;
	submitBtn.innerHTML = "Kirim Pendaftaran";
	submitBtn.style.opacity = "1";
	submitBtn.style.cursor = "pointer";
      
	console.error(err);

	alert(
  	"Gagal terhubung ke server\n\n" +
  	err.message
);
    }
  };


  if (file) {
    const reader = new FileReader();
    reader.onload = () => sendData(reader.result);
    reader.readAsDataURL(file);
  } else {
    sendData("");
  }

});
