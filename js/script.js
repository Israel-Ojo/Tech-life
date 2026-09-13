tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              900: '#1e3a8a',
            },
            darkbg: '#0b0f19',
            darkcard: '#111827',
            darkborder: '#1f2937',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  
    // Dark / Light Mode Toggle
    function toggleDarkMode() {
      const isDark = document.documentElement.classList.toggle('dark');
      const icon = document.getElementById('themeIcon');
      if (isDark) {
        icon.className = 'fas fa-moon text-lg';
        showToast('Switched to Dark Mode');
      } else {
        icon.className = 'fas fa-sun text-lg text-amber-400';
        showToast('Switched to Light Mode');
      }
    }

    // Sidebar Mobile Drawer Toggle
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      sidebar.classList.toggle('-translate-x-full');
      overlay.classList.toggle('hidden');
    }

    // Navigation Routing System
    function switchView(viewName) {
      // Hide all views
      document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.add('hidden');
      });

      // Show selected view
      const targetView = document.getElementById(`view-${viewName}`);
      if (targetView) {
        targetView.classList.remove('hidden');
      }

      // Update Active Navigation Item
      document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-view') === viewName) {
          item.classList.add('bg-brand-600/20', 'border-brand-500/40', 'text-white');
          item.classList.remove('border-transparent');
        } else {
          item.classList.remove('bg-brand-600/20', 'border-brand-500/40', 'text-white');
          item.classList.add('border-transparent');
        }
      });

      // Close mobile drawer if open
      if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
      }
    }

    // Toast Notification helper
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toastMsg');
      toastMsg.textContent = message;
      toast.classList.remove('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }

    // Feed Like Toggle
    function toggleLike(btn) {
      const countSpan = btn.querySelector('.like-count');
      let count = parseInt(countSpan.textContent);
      if (btn.classList.contains('text-brand-500')) {
        btn.classList.remove('text-brand-500');
        countSpan.textContent = count - 1;
      } else {
        btn.classList.add('text-brand-500');
        countSpan.textContent = count + 1;
        showToast('Liked post!');
      }
    }

    function shareCard(title) {
      navigator.clipboard?.writeText(window.location.href);
      showToast(`Copied link for: ${title}`);
    }

    // AI Chatbot logic
    function sendChatMessage() {
      const input = document.getElementById('chatInput');
      const messagesContainer = document.getElementById('chatMessages');
      const text = input.value.trim();

      if (!text) return;

      // Add user message
      messagesContainer.innerHTML += `
        <div class="flex items-start gap-3 justify-end">
          <div class="bg-brand-600 text-white text-sm p-3.5 rounded-2xl rounded-tr-none max-w-[85%] leading-relaxed shadow-md">
            ${escapeHtml(text)}
          </div>
        </div>
      `;

      input.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Update face to thinking
      const botFace = document.getElementById('botFace');
      botFace.textContent = '🤔';

      setTimeout(() => {
        const reply = getBotReply(text);
        messagesContainer.innerHTML += `
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AI
            </div>
            <div class="bg-slate-800/90 text-slate-200 text-sm p-3.5 rounded-2xl rounded-tl-none border border-slate-700 max-w-[85%] leading-relaxed">
              ${reply}
            </div>
          </div>
        `;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Dynamic Mood Response
        if (reply.includes("😊") || reply.includes("great") || reply.includes("awesome")) {
          botFace.textContent = '😃';
        } else if (reply.includes("sorry") || reply.includes("error")) {
          botFace.textContent = '😢';
        } else {
          botFace.textContent = '😀';
        }
      }, 800);
    }

    function getBotReply(query) {
      const q = query.toLowerCase();
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return "Hello Israel! How can I assist your coding journey today? 😊";
      }
      if (q.includes('joke')) {
        return "Why do programmers prefer dark mode? Because light attracts bugs! 😄";
      }
      if (q.includes('portfolio') || q.includes('skills')) {
        return "Israel is skilled in HTML5, CSS3, JS, Drumming (61%), and Keyboard (30%)!";
      }
      return "That's an interesting thought! Tech Life is always evolving with cool features.";
    }

    function clearChat() {
      document.getElementById('chatMessages').innerHTML = '';
      showToast('Chat history cleared.');
    }

    function triggerVoiceInput() {
      showToast('Voice Synthesis Activated - Speak Now...');
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Calculator State & Engine
    let calcVal = "0";
    let shouldResetDisplay = false;

    function updateCalcDisplay() {
      document.getElementById('calcDisplay').value = calcVal;
    }

    function calcNum(n) {
      if (calcVal === "0" || shouldResetDisplay) {
        calcVal = n;
        shouldResetDisplay = false;
      } else {
        calcVal += n;
      }
      updateCalcDisplay();
    }

    function calcDot() {
      if (!calcVal.includes('.')) {
        calcVal += '.';
        updateCalcDisplay();
      }
    }

    function calcOp(op) {
      calcVal += ` ${op} `;
      shouldResetDisplay = false;
      updateCalcDisplay();
    }

    function calcClear() {
      calcVal = "0";
      document.getElementById('calcHistory').textContent = '';
      updateCalcDisplay();
    }

    function calcBack() {
      if (calcVal.length > 1) {
        calcVal = calcVal.trim().slice(0, -1);
      } else {
        calcVal = "0";
      }
      updateCalcDisplay();
    }

    function calcSqrt() {
      try {
        const num = parseFloat(eval(calcVal));
        calcVal = Math.sqrt(num).toString();
        updateCalcDisplay();
      } catch (e) {
        calcVal = "Error";
        updateCalcDisplay();
      }
    }

    function calcEquals() {
      try {
        document.getElementById('calcHistory').textContent = calcVal;
        calcVal = eval(calcVal.replace(/×/g, '*').replace(/÷/g, '/')).toString();
        shouldResetDisplay = true;
      } catch (e) {
        calcVal = "Error";
      }
      updateCalcDisplay();
    }

    // Analog and Digital Clock Logic
    function updateClocks() {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secDeg = (seconds / 60) * 360;
      const minDeg = ((minutes + seconds / 60) / 60) * 360;
      const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

      const secHand = document.getElementById('secondHand');
      const minHand = document.getElementById('minuteHand');
      const hrHand = document.getElementById('hourHand');

      if (secHand) secHand.style.transform = `rotate(${secDeg}deg)`;
      if (minHand) minHand.style.transform = `rotate(${minDeg}deg)`;
      if (hrHand) hrHand.style.transform = `rotate(${hourDeg}deg)`;

      // Digital Clock
      const digitalClock = document.getElementById('digitalClock');
      const digitalDate = document.getElementById('digitalDate');
      if (digitalClock) {
        digitalClock.textContent = now.toLocaleTimeString();
      }
      if (digitalDate) {
        digitalDate.textContent = now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
      }
    }

    setInterval(updateClocks, 1000);
    updateClocks();

    function copyCode(btn) {
      showToast('Code copied to clipboard!');
    }