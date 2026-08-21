/**
 * PALLET GỖ VIỆT - B2B INDUSTRIAL SCRIPTS
 * Main JavaScript logic for interactivity, SEO state, and B2B Quote Cart management.
 */

// LocalStorage Key for Quote Cart
const QUOTE_CART_KEY = 'pallet_viet_quote_cart';

// Initial dummy cart items (3 SKUs) for demo display
const DEFAULT_CART_ITEMS = [
  {
    id: 'PL-KEO-1210-4W',
    name: 'Pallet Gỗ Keo 4 Hướng Nâng Tiêu Chuẩn Xuất Khẩu',
    size: '1200 x 1000 x 150 mm',
    woodType: 'Gỗ Keo Tràm (FSC)',
    loadCapacity: 'Tĩnh: 2500kg | Động: 1200kg',
    standard: 'Khử trùng ISPM 15 HT',
    quantity: 200,
    priceEst: '135.000đ - 165.000đ',
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
    priceEst: '190.000đ - 225.000đ',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'PL-KEO-2W-1111',
    name: 'Pallet Gỗ Keo 2 Hướng Chịu Tải 3-4 Tấn',
    size: '1100 x 1100 x 140 mm',
    woodType: 'Gỗ Keo Tải Nặng',
    loadCapacity: 'Tĩnh: 4000kg | Động: 2000kg',
    standard: 'Nan dày 22mm, đố khuyết',
    quantity: 100,
    priceEst: '140.000đ - 170.000đ',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80'
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
  const skuCount = cart ? cart.length : 0; // Đếm số SKU mặt hàng
  const badges = document.querySelectorAll('.quote-badge-count');
  badges.forEach(badge => {
    badge.textContent = skuCount;
    if (skuCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function addToQuoteCart(item) {
  const cart = getQuoteCart();
  const index = cart.findIndex(i => i.id === item.id);
  if (index >= 0) {
    cart[index].quantity = parseInt(cart[index].quantity || 0) + parseInt(item.quantity || 50);
  } else {
    cart.push(item);
  }
  saveQuoteCart(cart);
  showToastNotification(`Đã thêm "${item.name}" vào Bảng Báo Giá B2B!`);
}

function removeFromQuoteCart(itemId) {
  let cart = getQuoteCart();
  cart = cart.filter(i => i.id !== itemId);
  saveQuoteCart(cart);
  if (typeof renderQuoteTable === 'function') {
    renderQuoteTable();
  }
  showToastNotification('Đã xóa sản phẩm khỏi Bảng Báo Giá.');
}

function updateItemQuantity(itemId, quantity) {
  const cart = getQuoteCart();
  const index = cart.findIndex(i => i.id === itemId);
  if (index >= 0) {
    const qty = parseInt(quantity);
    if (qty <= 0) {
      removeFromQuoteCart(itemId);
      return;
    }
    cart[index].quantity = qty;
    saveQuoteCart(cart);
    if (typeof renderQuoteTable === 'function') {
      renderQuoteTable();
    }
  }
}

// Toast Notification
function showToastNotification(message) {
  let toast = document.getElementById('b2b-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'b2b-toast';
    toast.className = 'fixed top-5 right-5 z-50 bg-emerald-800 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-[-100px] opacity-0 text-sm font-semibold border border-emerald-600';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-400 text-lg"></i><span>${message}</span>`;
  toast.classList.remove('translate-y-[-100px]', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-[-100px]', 'opacity-0');
  }, 3500);
}

// Modal Popup - Quick Quote
function openQuickQuoteModal(productName = '') {
  let modal = document.getElementById('quick-quote-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-quote-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl transform scale-95 transition-transform duration-300 border-t-4 border-amber-600 relative">
        <button onclick="closeQuickQuoteModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1">&times;</button>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center text-lg"><i class="fa-solid fa-calculator"></i></div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 leading-tight">Yêu Cầu Báo Giá Sỉ Nhanh (15 Phút)</h3>
            <p class="text-xs text-gray-500">Báo giá trực tiếp tận xưởng sản xuất không qua trung gian</p>
          </div>
        </div>

        <form id="quick-quote-form" onsubmit="handleQuickQuoteSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Sản phẩm / Quy cách cần báo *</label>
            <input type="text" name="product_specs" id="quick-modal-product" value="${productName || 'Pallet gỗ theo yêu cầu / Pallet xuất khẩu'}" required
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
    `;
    document.body.appendChild(modal);
  }

  const inputEl = document.getElementById('quick-modal-product');
  if (inputEl && productName) {
    inputEl.value = productName;
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  const card = modal.querySelector('div');
  if (card) {
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
  }
}

function closeQuickQuoteModal() {
  const modal = document.getElementById('quick-quote-modal');
  if (modal) {
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    const card = modal.querySelector('div');
    if (card) {
      card.classList.remove('scale-100');
      card.classList.add('scale-95');
    }
  }
}

function handleQuickQuoteSubmit(e) {
  e.preventDefault();
  closeQuickQuoteModal();
  showSuccessModal(
    'Đã Gửi Yêu Cầu Báo Giá Thành Công!',
    'Bộ phận kinh doanh B2B của Xưởng Pallet Gỗ Việt sẽ tính toán chiết khấu số lượng và gửi bảng giá chi tiết kèm bản vẽ qua Zalo/Email trong vòng 15 phút.'
  );
}

function showSuccessModal(title, message) {
  let modal = document.getElementById('b2b-success-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'b2b-success-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center border-t-4 border-emerald-600 animate-scale-up">
      <div class="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
        <i class="fa-solid fa-check"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">${title}</h3>
      <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">${message}</p>
      <div class="bg-gray-50 rounded-xl p-4 text-xs text-left text-gray-600 mb-6 space-y-1.5 border border-gray-200">
        <div><i class="fa-solid fa-clock text-amber-600 mr-2"></i><strong>Thời gian phản hồi:</strong> Cam kết dưới 15 phút.</div>
        <div><i class="fa-solid fa-phone text-emerald-700 mr-2"></i><strong>Hotline hỗ trợ gấp:</strong> 0988.776.655 (GĐ Xưởng)</div>
        <div><i class="fa-solid fa-shield-halved text-emerald-700 mr-2"></i><strong>Cam kết chất lượng:</strong> Chuẩn ISPM 15, sai 1 đổi 1.</div>
      </div>
      <button onclick="document.getElementById('b2b-success-modal').remove()" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl transition">
        Đã Hiểu & Đóng
      </button>
    </div>
  `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Sticky header shadow on scroll
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
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
      
      document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(b => {
        b.classList.remove('border-emerald-700', 'text-emerald-800', 'bg-emerald-50', 'font-bold');
        b.classList.add('border-transparent', 'text-gray-600', 'hover:text-gray-900');
      });
      btn.classList.add('border-emerald-700', 'text-emerald-800', 'bg-emerald-50', 'font-bold');
      btn.classList.remove('border-transparent', 'text-gray-600');

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