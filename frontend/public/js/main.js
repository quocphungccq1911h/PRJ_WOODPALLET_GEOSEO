/**
 * PALLET GỖ VIỆT - B2B INDUSTRIAL SCRIPTS
 * Main JavaScript logic for interactivity, SEO state, and B2B Quote Cart management.
 */

// LocalStorage Key for Quote Cart
const QUOTE_CART_KEY = 'pallet_viet_quote_cart';

// Initial dummy cart items if empty for demo display
const DEFAULT_CART_ITEMS = [
  {
    id: 'PL-KEO-1210-4W',
    name: 'Pallet Gỗ Keo 4 Hướng Nâng Tiêu Chuẩn Xuất Khẩu',
    size: '1200 x 1000 x 150 mm',
    woodType: 'Gỗ Keo Tràm (FSC)',
    loadCapacity: 'Tĩnh: 2500kg | Động: 1200kg',
    standard: 'Khử trùng ISPM 15 HT',
    quantity: 200,
    priceEst: '135.000đ - 165.000đ/cái',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'PL-THONG-EURO-8012',
    name: 'Pallet Gỗ Thông EPAL / EURO Sấy Khô Bào Láng',
    size: '1200 x 800 x 144 mm',
    woodType: 'Gỗ Thông Nhập Khẩu Mới 100%',
    loadCapacity: 'Tĩnh: 3000kg | Động: 1500kg',
    standard: 'Độ ẩm < 18%, ISPM 15',
    quantity: 150,
    priceEst: '190.000đ - 225.000đ/cái',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80'
  }
];

// Initialize Cart
function getQuoteCart() {
  const data = localStorage.getItem(QUOTE_CART_KEY);
  if (!data) {
    localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(DEFAULT_CART_ITEMS));
    return DEFAULT_CART_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveQuoteCart(cart) {
  localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getQuoteCart();
  const totalCount = cart.reduce((sum, item) => sum + parseInt(item.quantity || 1), 0);
  const badges = document.querySelectorAll('.quote-badge-count');
  badges.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function addToQuoteCart(item) {
  const cart = getQuoteCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity = parseInt(existing.quantity) + parseInt(item.quantity || 50);
  } else {
    cart.push({
      ...item,
      quantity: parseInt(item.quantity || 50)
    });
  }
  saveQuoteCart(cart);
  showToast(`Đã thêm "${item.name}" vào Bảng Báo Giá (${item.quantity || 50} cái)!`);
}

function removeFromQuoteCart(id) {
  let cart = getQuoteCart();
  cart = cart.filter(item => item.id !== id);
  saveQuoteCart(cart);
  if (typeof renderQuoteTable === 'function') {
    renderQuoteTable();
  }
  showToast('Đã xóa sản phẩm khỏi bảng báo giá.', 'info');
}

function updateItemQuantity(id, qty) {
  let cart = getQuoteCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = Math.max(1, parseInt(qty) || 1);
    saveQuoteCart(cart);
    if (typeof renderQuoteTable === 'function') {
      renderQuoteTable();
    }
  }
}

// Toast Notification System
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-24 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-800 border-emerald-600' : 'bg-amber-900 border-amber-600';
  const icon = type === 'success' ? 'fa-check-circle text-emerald-300' : 'fa-info-circle text-amber-300';

  toast.className = `pointer-events-auto transform transition-all duration-300 ease-out translate-y-4 opacity-0 flex items-center p-4 min-w-[320px] max-w-md text-white ${bgClass} border rounded-xl shadow-2xl space-x-3`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-2xl flex-shrink-0"></i>
    <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
    <button class="text-gray-300 hover:text-white ml-2 p-1" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global Modal Handler
function showSuccessModal(title, message) {
  const modalHtml = `
    <div id="b2b-success-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-t-4 border-emerald-600 text-center animate-scale-up">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
          <i class="fa-solid fa-truck-ramp-box"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2 font-display">${title || 'Gửi Yêu Cầu Thành Công!'}</h3>
        <p class="text-gray-600 text-sm leading-relaxed mb-6">${message || 'Phòng Kỹ thuật & Bán hàng B2B Xưởng Pallet Gỗ Việt đã tiếp nhận. Chuyên viên kinh doanh khu vực sẽ liên hệ gửi báo giá chiết khấu trong <strong>15 phút</strong>.'}</p>
        
        <div class="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-200 text-left text-xs text-emerald-900 space-y-2">
          <div class="flex items-center gap-2 font-semibold text-emerald-800">
            <i class="fa-solid fa-phone-volume"></i> Hotline Hỗ Trợ Gấp 24/7:
            <a href="tel:0988776655" class="text-amber-700 font-bold hover:underline">0988.776.655</a>
          </div>
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-clock"></i> Thời gian phản hồi tiêu chuẩn: 15 - 30 phút
          </div>
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-shield-halved"></i> Cam kết giá gốc xuất xưởng - Đủ chứng chỉ ISPM 15
          </div>
        </div>

        <button onclick="closeSuccessModal()" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-lg shadow-emerald-700/30">
          Đã Hiểu & Đóng Cửa Sổ
        </button>
      </div>
    </div>
  `;

  const oldModal = document.getElementById('b2b-success-modal');
  if (oldModal) oldModal.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeSuccessModal() {
  const modal = document.getElementById('b2b-success-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.remove(), 200);
  }
}

// Quick Quote Modal Trigger
function openQuickQuoteModal(productName = '') {
  const modalHtml = `
    <div id="quick-quote-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-t-4 border-amber-600 relative">
        <button onclick="closeQuickQuoteModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          &times;
        </button>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
            <i class="fa-solid fa-calculator"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">Nhận Báo Giá Nhanh B2B</h3>
            <p class="text-xs text-gray-500">Báo giá trực tiếp tận xưởng sản xuất không qua trung gian</p>
          </div>
        </div>

        <form id="quick-quote-form" onsubmit="handleQuickQuoteSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Sản phẩm / Quy cách cần báo *</label>
            <input type="text" name="product_specs" value="${productName || 'Pallet gỗ theo yêu cầu / Pallet xuất khẩu'}" required
                   class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Số lượng dự kiến (cái) *</label>
              <input type="number" name="quantity" min="20" placeholder="VD: 200" required
                     class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Tải trọng yêu cầu (kg)</label>
              <input type="text" name="capacity" placeholder="VD: Động 1000kg, Tĩnh 2000kg"
                     class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Họ tên người liên hệ *</label>
              <input type="text" name="fullname" placeholder="Anh/Chị phụ trách mua hàng" required
                     class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Số điện thoại / Zalo *</label>
              <input type="tel" name="phone" placeholder="09xx xxx xxx" required
                     class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Khu công nghiệp / Địa chỉ giao hàng *</label>
            <input type="text" name="delivery_location" placeholder="VD: KCN VSIP 1, Thuận An, Bình Dương" required
                   class="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none">
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input type="checkbox" id="need_ispm15" name="ispm15" class="w-4 h-4 text-emerald-600 rounded">
            <label for="need_ispm15" class="text-xs text-gray-700 font-medium">Yêu cầu cấp Chứng chỉ sấy nhiệt/hun trùng xuất khẩu ISPM 15</label>
          </div>

          <button type="submit" class="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30">
            <i class="fa-solid fa-paper-plane"></i> Gửi Yêu Cầu Báo Giá Ngay (Miễn Phí)
          </button>
        </form>
      </div>
    </div>
  `;

  const oldModal = document.getElementById('quick-quote-modal');
  if (oldModal) oldModal.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeQuickQuoteModal() {
  const modal = document.getElementById('quick-quote-modal');
  if (modal) modal.remove();
}

function handleQuickQuoteSubmit(event) {
  event.preventDefault();
  closeQuickQuoteModal();
  showSuccessModal('Yêu Cầu Báo Giá Đã Được Gửi!', 'Bộ phận kinh doanh B2B Pallet Gỗ Việt sẽ tính toán phương án bốc xếp, cước vận chuyển tới KCN của Quý khách và gửi bảng giá chiết khấu sau 15 phút.');
}

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  // Update quote cart badge
  updateCartBadge();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Sticky Header Effect
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        mainHeader.classList.remove('bg-white');
      } else {
        mainHeader.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        mainHeader.classList.add('bg-white');
      }
    });
  }

  // Generic form submissions with data-b2b-form
  const b2bForms = document.querySelectorAll('form[data-b2b-form]');
  b2bForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.getAttribute('data-b2b-form');
      if (formType === 'cart-checkout') {
        localStorage.removeItem(QUOTE_CART_KEY);
        updateCartBadge();
        if (typeof renderQuoteTable === 'function') {
          renderQuoteTable();
        }
      }
      showSuccessModal(
        'Đã Tiếp Nhận Hồ Sơ Đặt Hàng / Báo Giá!',
        'Cảm ơn Quý khách. Đội ngũ kỹ sư kết cấu & phụ trách KCN sẽ liên hệ xác nhận kích thước, tải trọng và gửi hợp đồng mẫu qua Zalo/Email.'
      );
      form.reset();
    });
  });

  // Tab switching handler
  const tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      const tabGroup = btn.getAttribute('data-tab-group') || 'default';
      
      // Update buttons in group
      document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(b => {
        b.classList.remove('border-emerald-700', 'text-emerald-800', 'bg-emerald-50', 'font-bold');
        b.classList.add('border-transparent', 'text-gray-600', 'hover:text-gray-900');
      });
      btn.classList.add('border-emerald-700', 'text-emerald-800', 'bg-emerald-50', 'font-bold');
      btn.classList.remove('border-transparent', 'text-gray-600');

      // Update content panes
      document.querySelectorAll(`[data-tab-content="${tabGroup}"]`).forEach(pane => {
        pane.classList.add('hidden');
      });
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.remove('hidden');
      }
    });
  });

  // Render product filter on san-pham.html if exists
  initProductFilter();
});

// Product Filtering Logic for san-pham.html
function initProductFilter() {
  const filterForm = document.getElementById('product-filter-form');
  const productCards = document.querySelectorAll('.product-item-card');
  const resultCount = document.getElementById('filter-result-count');

  if (!filterForm || productCards.length === 0) return;

  function applyFilters() {
    const selectedWoods = Array.from(filterForm.querySelectorAll('input[name="wood_type"]:checked')).map(el => el.value);
    const selectedLoads = Array.from(filterForm.querySelectorAll('input[name="load_capacity"]:checked')).map(el => el.value);
    const selectedStandards = Array.from(filterForm.querySelectorAll('input[name="standard"]:checked')).map(el => el.value);
    const selectedEntry = Array.from(filterForm.querySelectorAll('input[name="entry_ways"]:checked')).map(el => el.value);

    let visibleCount = 0;

    productCards.forEach(card => {
      const wood = card.getAttribute('data-wood') || '';
      const load = card.getAttribute('data-load') || '';
      const standard = card.getAttribute('data-standard') || '';
      const entry = card.getAttribute('data-entry') || '';

      const matchWood = selectedWoods.length === 0 || selectedWoods.some(w => wood.includes(w));
      const matchLoad = selectedLoads.length === 0 || selectedLoads.some(l => load.includes(l));
      const matchStandard = selectedStandards.length === 0 || selectedStandards.some(s => standard.includes(s));
      const matchEntry = selectedEntry.length === 0 || selectedEntry.some(e => entry.includes(e));

      if (matchWood && matchLoad && matchStandard && matchEntry) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (resultCount) {
      resultCount.textContent = `Hiển thị ${visibleCount} sản phẩm phù hợp`;
    }
  }

  filterForm.addEventListener('change', applyFilters);

  const resetBtn = document.getElementById('reset-filter-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterForm.reset();
      applyFilters();
    });
  }
}
