const fs = require('fs');
const { getHead, getNavbar, getFooter } = require('./template_helpers');

function buildBaogia() {
  const head = getHead(
    "Giỏ Báo Giá B2B & Yêu Cầu Báo Giá Sỉ Chiết Khấu | Pallet Gỗ Việt",
    "Gửi danh sách quy cách pallet cần báo giá sỉ cho nhà máy tại KCN. Phản hồi nhanh trong 15 phút kèm dự toán cước vận chuyển và chứng thư ISPM 15."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <span class="text-brand font-bold">Bảng Báo Giá B2B</span>
    </div>
  </div>

  <section class="bg-brand-dark text-white py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span class="text-xs uppercase font-bold text-amber-400 tracking-wider">Hồ Sơ Yêu Cầu Báo Giá Sỉ Doanh Nghiệp</span>
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display mt-1">BẢNG DỰ TOÁN BÁO GIÁ PALLET GỖ B2B</h1>
      <p class="text-gray-300 text-sm mt-2">Kiểm tra các loại pallet đã chọn, điền thông tin địa chỉ nhà máy để xưởng tính toán chiết khấu và cước vận chuyển tốt nhất.</p>
    </div>
  </section>

  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- CART ITEMS -->
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                <i class="fa-solid fa-clipboard-list text-brand"></i> Danh Sách Pallet Đã Chọn
              </h2>
              <a href="san-pham.html" class="text-xs text-brand hover:underline font-bold">+ Thêm loại pallet khác</a>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs sm:text-sm text-gray-700">
                <thead class="bg-gray-100 text-gray-600 uppercase text-[11px]">
                  <tr>
                    <th class="p-3 rounded-l-lg">Sản Phẩm & Quy Cách</th>
                    <th class="p-3 text-center">Số Lượng</th>
                    <th class="p-3 text-right">Đơn Giá Dự Kiến</th>
                    <th class="p-3 rounded-r-lg text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody id="quote-cart-table-body" class="divide-y divide-gray-100"></tbody>
              </table>
            </div>

            <div id="quote-cart-empty" class="hidden text-center py-10 space-y-3">
              <p class="text-sm text-gray-500 font-medium">Bảng báo giá hiện đang trống.</p>
              <a href="san-pham.html" class="inline-block bg-brand text-white font-bold text-xs px-5 py-2.5 rounded-xl">Duyệt Sản Phẩm</a>
            </div>

            <div id="quote-cart-summary" class="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs gap-3">
              <div class="text-gray-600">Tổng số lượng đặt sỉ: <strong id="cart-total-qty" class="text-base text-brand font-extrabold">350</strong> cái</div>
              <div class="text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                <i class="fa-solid fa-tag mr-1"></i> Áp dụng <strong>Chiết Khấu Cấp 1</strong> cho đơn hàng lớn
              </div>
            </div>
          </div>
        </div>

        <!-- FORM -->
        <div class="lg:col-span-5">
          <div class="bg-white rounded-2xl p-6 sm:p-7 border-2 border-brand shadow-lg relative">
            <div class="absolute -top-3.5 right-6 bg-brand-accent text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow">Ưu Tiên B2B</div>
            <h3 class="text-xl font-bold text-gray-900 mb-1">Thông Tin Doanh Nghiệp Nhận Báo Giá</h3>
            <p class="text-xs text-gray-500 mb-6">Xưởng sẽ liên hệ gửi bản vẽ và bảng giá chi tiết sau 15 phút.</p>

            <form data-b2b-form="cart-checkout" class="space-y-4 text-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Người Phụ Trách *</label>
                  <input type="text" placeholder="Nguyễn Văn A" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Chức Vụ</label>
                  <select class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
                    <option>Phòng Mua Hàng (Procurement)</option>
                    <option>Quản Lý Kho Vận (Logistics)</option>
                    <option>Kỹ Thuật QA/QC</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Tên Công Ty / Doanh Nghiệp *</label>
                <input type="text" placeholder="Tên doanh nghiệp..." required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Số ĐT / Zalo *</label>
                  <input type="tel" placeholder="09xx xxx xxx" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Email Nhận Báo Giá *</label>
                  <input type="email" placeholder="muahang@congty.com" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Nhà Máy / KCN Giao Hàng *</label>
                <input type="text" placeholder="VD: Lô A-12, KCN VSIP 1, Bình Dương" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
              </div>

              <div class="pt-2 space-y-2 text-xs text-gray-700">
                <label class="flex items-center gap-2"><input type="checkbox" checked class="w-4 h-4 text-brand rounded"><span>Cấp chứng thư khử trùng nhiệt ISPM 15 HT</span></label>
                <label class="flex items-center gap-2"><input type="checkbox" class="w-4 h-4 text-brand rounded"><span>Yêu cầu bào láng 4 mặt chống xước hàng</span></label>
              </div>

              <button type="submit" class="w-full bg-brand-accent hover:bg-orange-600 text-white font-extrabold text-sm py-4 px-6 rounded-xl transition shadow-lg">
                <i class="fa-solid fa-paper-plane mr-1"></i> GỬI YÊU CẦU BÁO GIÁ XƯỞNG (15 PHÚT)
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>

  <script>
    function renderQuoteTable() {
      const tbody = document.getElementById('quote-cart-table-body');
      const emptyDiv = document.getElementById('quote-cart-empty');
      const summaryDiv = document.getElementById('quote-cart-summary');
      const totalQtyEl = document.getElementById('cart-total-qty');
      if (!tbody) return;

      const cart = getQuoteCart();
      if (!cart || cart.length === 0) {
        tbody.innerHTML = '';
        if (emptyDiv) emptyDiv.classList.remove('hidden');
        if (summaryDiv) summaryDiv.classList.add('hidden');
        return;
      }

      if (emptyDiv) emptyDiv.classList.add('hidden');
      if (summaryDiv) summaryDiv.classList.remove('hidden');

      let html = '';
      let totalQty = 0;

      cart.forEach(item => {
        const qty = parseInt(item.quantity || 50);
        totalQty += qty;
        html += \`
          <tr class="hover:bg-gray-50 transition">
            <td class="p-3">
              <div class="flex items-center gap-3">
                <img src="\${item.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80'}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
                <div>
                  <div class="font-bold text-gray-900 text-xs sm:text-sm">\${item.name}</div>
                  <div class="text-[11px] text-gray-500">\${item.size} • \${item.woodType}</div>
                </div>
              </div>
            </td>
            <td class="p-3 text-center">
              <div class="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button onclick="updateItemQuantity('\${item.id}', \${qty - 10})" class="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold">-</button>
                <input type="number" min="10" step="10" value="\${qty}" onchange="updateItemQuantity('\${item.id}', this.value)"
                       class="w-14 text-center font-bold text-xs py-1 outline-none bg-transparent">
                <button onclick="updateItemQuantity('\${item.id}', \${qty + 10})" class="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold">+</button>
              </div>
            </td>
            <td class="p-3 text-right font-bold text-brand text-xs sm:text-sm">\${item.priceEst || 'Liên hệ'}</td>
            <td class="p-3 text-center">
              <button onclick="removeFromQuoteCart('\${item.id}')" class="text-gray-400 hover:text-red-600 p-1 transition"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>
        \`;
      });

      tbody.innerHTML = html;
      if (totalQtyEl) totalQtyEl.textContent = totalQty;
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderQuoteTable();
    });
  </script>
  `;

  const output = head + getNavbar('quote') + body + getFooter();
  fs.writeFileSync('bao-gia.html', output, 'utf8');
  console.log('Built bao-gia.html');
}

function buildKhuvuc() {
  const head = getHead(
    "Xưởng Sản Xuất & Cung Cấp Pallet Gỗ Tại KCN VSIP 1 Bình Dương | Giao 2-4h",
    "Xưởng cung ứng Pallet Gỗ Keo, Pallet Gỗ Thông xuất khẩu ISPM 15 cho các doanh nghiệp FDI tại Khu Công Nghiệp VSIP 1, TP. Thuận An, Bình Dương."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <span class="text-brand font-bold">KCN VSIP 1 - Bình Dương</span>
    </div>
  </div>

  <section class="relative bg-brand-dark text-white py-16 md:py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase">
          <i class="fa-solid fa-map-location-dot"></i> ĐỊA PHƯƠNG HÓA • BÁN KÍNH 5KM
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight">
          XƯỞNG SẢN XUẤT & CUNG CẤP PALLET GỖ TẠI KCN VSIP 1 - BÌNH DƯƠNG
        </h1>
        <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
          Xưởng đặt sát KCN VSIP 1 (Thuận An), cam kết <strong>giao hàng 2 - 4 giờ</strong>, miễn phí cước vận chuyển cho đơn hàng sỉ, chứng chỉ ISPM 15 xuất khẩu Mỹ, EU, Nhật.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-widest text-brand bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">Dự Toán Chi Phí</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 font-display">BẢNG GIÁ THEO CHUYẾN XE GIAO KCN VSIP 1</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 mb-2">Xe Tải 2.5 - 5 Tấn</h3>
          <div class="text-3xl font-extrabold text-brand mb-4">145.000đ <span class="text-xs text-gray-500 font-normal">/ cái</span></div>
          <p class="text-xs text-gray-600 mb-4">100 - 200 cái / chuyến • Giao nhanh 2 giờ</p>
          <button onclick="openQuickQuoteModal('Xe 5T giao KCN VSIP 1')" class="w-full bg-emerald-50 text-brand font-bold text-xs py-3 rounded-xl border border-emerald-200">Đặt Chuyến Này</button>
        </div>

        <div class="bg-white rounded-2xl p-6 border-2 border-brand-accent shadow-xl relative">
          <div class="absolute -top-3.5 right-6 bg-brand-accent text-white text-xs font-extrabold px-3 py-1 rounded-full">Tiết Kiệm Nhất</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Xe Tải 10 - 15 Tấn</h3>
          <div class="text-3xl font-extrabold text-brand mb-4">138.000đ <span class="text-xs text-gray-500 font-normal">/ cái</span></div>
          <p class="text-xs text-gray-600 mb-4">350 - 500 cái / chuyến • Freeship 100%</p>
          <button onclick="openQuickQuoteModal('Xe 15T giao KCN VSIP 1')" class="w-full bg-brand text-white font-bold text-xs py-3 rounded-xl">Đặt Chuyến Này</button>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 mb-2">Container 40ft</h3>
          <div class="text-3xl font-extrabold text-brand mb-4">132.000đ <span class="text-xs text-gray-500 font-normal">/ cái</span></div>
          <p class="text-xs text-gray-600 mb-4">1.000+ cái / tháng • Hợp đồng dài hạn</p>
          <button onclick="openQuickQuoteModal('Hợp đồng Container 40ft KCN VSIP 1')" class="w-full bg-emerald-50 text-brand font-bold text-xs py-3 rounded-xl border border-emerald-200">Ký Hợp Đồng</button>
        </div>
      </div>
    </div>
  </section>
  `;

  const output = head + getNavbar('geo') + body + getFooter();
  fs.writeFileSync('khu-vuc-geo.html', output, 'utf8');
  console.log('Built khu-vuc-geo.html');
}

module.exports = { buildBaogia, buildKhuvuc };