const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

let w, h;
function resize() {
    w = starsCanvas.width = window.innerWidth;
    h = starsCanvas.height = window.innerHeight;
}
window.addEventListener("resize",resize);
resize();

const stars = [];
const STAR_COUNT = 500;
for (let i =0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005
    });
}

function drawStars() {
    starsCtx.clearRect(0, 0, w, h);
    starsCtx.fillStyle = "white";
    stars.forEach(star => {
        star.alpha += star.delta;
        if (star.apha <= 0 || star.apha >= 1) star.delta = -star.delta;
        starsCtx.globalApha = star.alpha;
        starsCtx.beginPath();
        starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starsCtx.fill();
    });
    starsCtx.globalApha = 1;
    requestAnimationFrame(drawStars);
}
drawStars();

const constellation = [
    {
        name: "Pisces",
        image: "Pisces.png",
        description: "Helu ebe của cún, nay là sinh nhật lần thứ 20 của em rùi ha. Có lẽ năm nay là năm đặc biệt với em, anh không giỏi ăn nói lắm nhưng vẫn có một vài đôi lời muốn gửi gắm đến em, có lẻ nhiều đấy, mong em dành chút thời gian để đọc và cảm nhận nhé! Trước tiên, chúc em sinh nhật vui vẻ và thành công trên con đường em chọn. Với anh, em vừa ngoan, vừa xinh, vừa giỏi, đôi lúc anh cũng thấy chạnh lòng vì anh không có gì để xứng với em cả. Anh biết là anh vẫn còn trẻ con, đôi lúc còn khiến em buồn nhiều, anh vẫn cố gắng khắc phục những gì mà em nói để hoàn thiện bản thân và phù hợp với em. Mắt em đẹp lắm, không phải môi nên đừng làm đỏ nó! Sau 1 tháng quay lại với nhau và 3 lần làm em khóc, anh cũng cảm nhận được em thay đổi qua từng ngày, em vẫn làm điều đó với anh nhưng không còn như lúc ban đầu nữa, không sao anh đủ lớn để hiểu điều đó. Nên anh luôn tìm mọi cách để em vui và cảm thấy thoải mái, anh được sinh ra trong gia đình không được tốt đẹp lắm, ngược lại với gia đình em hoàn toàn, nên anh có những suy nghĩ hơi tiêu cực. Anh mong em sau khi đọc được những dòng này có thể vui vẻ hơn, hạnh phúc hơn, mắt em không phải môi nên đừng làm đỏ nó! Anh biết là không nên nói trước điều gì cả vì nói trước bước không qua, nhưng anh vẫn muốn nói với em, dù em có đi lần nữa, anh vẫn tìm và chờ em về."
    }
];

let currentIndex = 0;
const Image = document.getElementById("Image");
const Name = document.getElementById("Name");
const Description = document.getElementById("Description");

let typingTimeout;

function typeWriter(text, element, callback) {
    element.textContent = "";
    element.style.opacity = 1;

    let i = 0;
    const speed = 50;

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        } else {
            typingTimeout = null;
            if (callback) callback();
        }
    }

    type();
}

function updateConstellationImage() {
    Image.style.opacity = 0;
    Name.style.opacity = 0;
    Description.style.opacity = 0;

    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    Description.textContent = "";

    setTimeout(() => {
        const data = constellation[currentIndex];
        Image.src = data.image;
        Name.textContent = data.name;

        Image.onload = () => {
            Image.style.opacity = 1;
            Name.style.opacity = 1;
            Description.style.opacity = 0; // 1 or 0 vẫn ổn

            Image.onclick = null;

            Image.onclick = () => {
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                }
                Description.textContent = "";
                Description.style.opacity = 1;
                typeWriter(data.description, Description); 
            };
        };
    }, 500);
}

function goToNext() {
    currentIndex = (currentIndex + 1) % constellation.length;
    updateConstellationImage();
}

function goToPrevious() {
    currentIndex = (currentIndex - 1 + constellation.length) % constellation.length;
    updateConstellationImage()
}

document.getElementById("previous").onclick = goToPrevious;
document.getElementById("next").onclick =goToNext;

let scrollCooldown = false;
window.addEventListener("wheel", (e) => {
    if (scrollCooldown) return;
    if (e.deltaY > 0) goToNext();
    else goToPrevious();
    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, 1000);
});

function createMeteor() {
    const meteor = document.createElement("div");
    meteor,className = "meteor";
    meteor.style.top = Math.random() * window.innerHeight * 1 + "px";
    meteor.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(meteor);
    setTimeout(() => meteor.remove(), 1000);
}

function launchMeteorLoop() {
    createMeteor();
    const nextMeteorDelay = Math.random() * 2000 + 500;
    setTimeout(launchMeteorLoop, nextMeteorDelay);
}

launchMeteorLoop();

updateConstellationImage();
function createBurstStars(x, y) {
const burstCount = 20;
for (let i = 0; i < burstCount; i++) {
    const star = document.createElement("div");
    star.className = "burst-star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    star.animate([
        { transform: `translate(0 ,0)`, opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
       duration: 800,
       easing: "ease-out",
       fill: "forwards"  
    });

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
}
}

// Gọi hàm khi chạm hoặc click
window.addEventListener("click", (e) => {
    createBurstStars(e.clientX, e.clientY);
});
