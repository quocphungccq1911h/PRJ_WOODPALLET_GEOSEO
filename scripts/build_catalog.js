const fs = require('fs');
const { getHead, getNavbar, getFooter } = require('./template_helpers');
const { products } = require('./data');
const { renderProductCard } = require('./build_home');

function buildSanpham() {
  const head = getHead(
    "Danh Mục Pallet Gỗ B2B & Bộ Lọc Tải Trọng | Xưởng Pallet Gỗ Việt",
    "Tra cứu và lọc báo giá Pallet gỗ keo, gỗ thông, pallet 2 hướng, 4 hướng nâng, pallet ván ép plywood, thùng kiện gỗ xuất khẩu đạt chuẩn ISPM 15."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <span class="text-brand font-bold">Danh mục sản phẩm</span>
    </div>
  </div>

  <section class="bg-brand-dark text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <span class="text-xs uppercase font-bold text-amber-400 tracking-wider">Hệ Thống Sản Phẩm B2B Trực Tiếp</span>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display mt-1">DANH MỤC & BỘ LỌC PALLET GỖ</h1>
        <p class="text-gray-300 text-sm mt-2 max-w-2xl">Lọc theo loại gỗ, tải trọng, hướng nâng và tiêu chuẩn ISPM 15. Thêm vào bảng báo giá để nhận chiết khấu sỉ.</p>
      </div>
      <button onclick="openQuickQuoteModal('Pallet quy cách riêng theo bản vẽ')" class="bg-brand-accent hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition shadow flex items-center gap-2">
        <i class="fa-solid fa-pen-ruler"></i> Báo Giá Bản Vẽ Riêng
      </button>
    </div>
  </section>

  <section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- SIDEBAR FILTER -->
        <aside class="lg:col-span-3">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <h3 class="font-bold text-gray-900 text-base flex items-center gap-2">
                <i class="fa-solid fa-filter text-brand"></i> Bộ Lọc Tìm Kiếm
              </h3>
              <button id="reset-filter-btn" class="text-xs text-brand hover:underline font-semibold">Thiết lập lại</button>
            </div>

            <form id="product-filter-form" class="space-y-6 text-sm">
              <div>
                <h4 class="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">Loại Chất Liệu Gỗ</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="wood_type" value="keo" class="w-4 h-4 text-brand rounded"><span>Gỗ Keo Tràm (Acacia)</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="wood_type" value="thong" class="w-4 h-4 text-brand rounded"><span>Gỗ Thông (Pine Wood)</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="wood_type" value="van-ep" class="w-4 h-4 text-brand rounded"><span>Ván Ép Plywood</span></label>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100">
                <h4 class="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">Số Hướng Nâng</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="entry_ways" value="4-way" class="w-4 h-4 text-brand rounded"><span>4 Hướng Nâng (4-Way)</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="entry_ways" value="2-way" class="w-4 h-4 text-brand rounded"><span>2 Hướng Nâng (2-Way)</span></label>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100">
                <h4 class="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">Tải Trọng Động</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="load_capacity" value="load-light" class="w-4 h-4 text-brand rounded"><span>Tải Nhẹ (&lt; 800 kg)</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="load_capacity" value="load-medium" class="w-4 h-4 text-brand rounded"><span>Tải Vừa (1.000 - 1.500 kg)</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="load_capacity" value="load-heavy" class="w-4 h-4 text-brand rounded"><span>Tải Nặng (2.000 - 4.000 kg)</span></label>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-100">
                <h4 class="font-bold text-xs text-gray-700 uppercase tracking-wider mb-3">Tiêu Chuẩn</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="standard" value="ispm15" class="w-4 h-4 text-brand rounded"><span>Khử trùng ISPM 15 HT</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="standard" value="epal" class="w-4 h-4 text-brand rounded"><span>Chuẩn EPAL / EURO</span></label>
                  <label class="flex items-center gap-2.5 cursor-pointer text-gray-600"><input type="checkbox" name="standard" value="bao-lang" class="w-4 h-4 text-brand rounded"><span>Bào Láng 4 Mặt</span></label>
                </div>
              </div>
            </form>
          </div>
        </aside>

        <!-- PRODUCT LIST -->
        <main class="lg:col-span-9">
          <div class="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 mb-6">
            <span id="filter-result-count" class="text-sm font-semibold text-gray-700">Hiển thị ${products.length} sản phẩm</span>
            <div class="text-xs text-gray-500">Sẵn sàng giao 2-4h tới KCN</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="product-list-container">
            ${products.map(p => renderProductCard(p)).join('')}
          </div>
        </main>

      </div>
    </div>
  </section>
  `;

  const output = head + getNavbar('products') + body + getFooter();
  fs.writeFileSync('san-pham.html', output, 'utf8');
  console.log('Built san-pham.html');
}

function buildChitiet() {
  const head = getHead(
    "Pallet Gỗ Keo 4 Hướng Nâng Xuất Khẩu ISPM 15 (1200x1000x150mm) | Pallet Gỗ Việt",
    "Thông số kỹ thuật chi tiết Pallet Gỗ Keo 4 hướng nâng chịu tải tĩnh 2500kg, sấy nhiệt HT đạt chuẩn ISPM 15 xuất khẩu đi Mỹ, Châu Âu, Nhật Bản."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <a href="san-pham.html" class="hover:text-brand">Danh mục sản phẩm</a>
      <span>/</span>
      <span class="text-brand font-bold">Pallet Gỗ Keo 4 Hướng Nâng Xuất Khẩu</span>
    </div>
  </div>

  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- GALLERY -->
        <div class="lg:col-span-6 space-y-4">
          <div class="relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 h-80 sm:h-96 md:h-[450px]">
            <img id="main-product-image" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80" alt="Pallet Gỗ Keo" class="w-full h-full object-cover">
            <span class="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-md shadow">
              <i class="fa-solid fa-certificate text-amber-400"></i> Đạt Chuẩn ISPM 15 HT
            </span>
          </div>

          <div class="grid grid-cols-4 gap-3">
            <button onclick="document.getElementById('main-product-image').src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'" class="h-20 rounded-xl overflow-hidden border-2 border-brand"><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover"></button>
            <button onclick="document.getElementById('main-product-image').src='https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1000&q=80'" class="h-20 rounded-xl overflow-hidden border border-gray-300"><img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover"></button>
            <button onclick="document.getElementById('main-product-image').src='https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80'" class="h-20 rounded-xl overflow-hidden border border-gray-300"><img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover"></button>
            <button onclick="document.getElementById('main-product-image').src='https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'" class="h-20 rounded-xl overflow-hidden border border-gray-300"><img src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover"></button>
          </div>
        </div>

        <!-- INFO -->
        <div class="lg:col-span-6 space-y-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-semibold text-brand-wood uppercase mb-1">Mã: PL-KEO-1210-4W</div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">Pallet Gỗ Keo 4 Hướng Nâng Tiêu Chuẩn Xuất Khẩu ISPM 15</h1>
          </div>

          <div class="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <div class="flex items-baseline gap-3">
              <span class="text-xs text-gray-500 font-medium">Giá sỉ xuất xưởng B2B:</span>
              <span class="text-2xl font-extrabold text-brand">135.000đ - 165.000đ</span>
              <span class="text-xs text-gray-500">/ cái</span>
            </div>
            <p class="text-xs text-emerald-800 font-medium mt-1"><i class="fa-solid fa-truck-fast"></i> Miễn phí vận chuyển từ 200 cái tới KCN Bình Dương, Đồng Nai.</p>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-white rounded-xl border border-gray-200"><span class="text-gray-500 block">Kích thước:</span><span class="font-bold text-gray-900 text-sm">1200 x 1000 x 150 mm</span></div>
            <div class="p-3 bg-white rounded-xl border border-gray-200"><span class="text-gray-500 block">Tải trọng tĩnh/động:</span><span class="font-bold text-gray-900 text-sm">2.500 kg / 1.200 kg</span></div>
            <div class="p-3 bg-white rounded-xl border border-gray-200"><span class="text-gray-500 block">Chất liệu:</span><span class="font-bold text-gray-900 text-sm">Keo Tràm xẻ sấy (FSC)</span></div>
            <div class="p-3 bg-white rounded-xl border border-gray-200"><span class="text-gray-500 block">Độ ẩm:</span><span class="font-bold text-gray-900 text-sm">&lt; 18% (Khô chống mốc)</span></div>
          </div>

          <div class="space-y-4 pt-2">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2">Số lượng đặt hàng dự kiến (cái)</label>
              <div class="flex items-center gap-3">
                <div class="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                  <button onclick="let q=document.getElementById('detail-qty'); q.value=Math.max(30, parseInt(q.value)-20)" class="px-4 py-2.5 text-gray-600 font-bold">-</button>
                  <input id="detail-qty" type="number" min="30" step="10" value="100" class="w-24 text-center font-bold text-sm bg-transparent outline-none py-2.5">
                  <button onclick="let q=document.getElementById('detail-qty'); q.value=parseInt(q.value)+20" class="px-4 py-2.5 text-gray-600 font-bold">+</button>
                </div>
                <span class="text-xs text-gray-500">(MOQ tối thiểu: 30 cái)</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onclick="addToQuoteCart({id:'PL-KEO-1210-4W', name:'Pallet Gỗ Keo 4 Hướng Nâng Xuất Khẩu', size:'1200 x 1000 x 150 mm', woodType:'Gỗ Keo Tràm', loadCapacity:'Tĩnh 2500kg / Động 1200kg', standard:'ISPM 15 HT', quantity: parseInt(document.getElementById('detail-qty').value)||100, priceEst:'135.000đ - 165.000đ', image:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'})"
                      class="bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-cart-plus"></i> Thêm Vào Bảng Báo Giá
              </button>
              <button onclick="openQuickQuoteModal('Pallet Gỗ Keo 1200x1000x150mm')"
                      class="bg-brand-accent hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-file-invoice-dollar"></i> Nhận Báo Giá Nhanh
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- TABS -->
      <div class="mt-16">
        <div class="flex border-b border-gray-200 space-x-2">
          <button data-tab-group="product-detail" data-tab-target="tab-specs" class="py-3 px-5 text-sm font-bold text-emerald-800 border-b-2 border-emerald-700 bg-emerald-50 rounded-t-xl transition">Bảng Thông Số Kỹ Thuật</button>
          <button data-tab-group="product-detail" data-tab-target="tab-ispm15" class="py-3 px-5 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-900 transition">Tiêu Chuẩn ISPM 15</button>
          <button data-tab-group="product-detail" data-tab-target="tab-shipping" class="py-3 px-5 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-900 transition">Xếp Cont & Vận Chuyển</button>
        </div>

        <div id="tab-specs" data-tab-content="product-detail" class="py-8">
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <table class="w-full text-left text-xs sm:text-sm text-gray-700">
              <thead class="bg-emerald-900 text-white uppercase text-[11px]">
                <tr><th class="p-3.5 rounded-l-lg">Hạng Mục</th><th class="p-3.5">Quy Cách (mm)</th><th class="p-3.5">Số Lượng</th><th class="p-3.5 rounded-r-lg">Ghi Chú</th></tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr class="bg-white"><td class="p-3.5 font-bold">Nan mặt trên</td><td class="p-3.5">1200 x 90 x 20 mm</td><td class="p-3.5">07 thanh</td><td class="p-3.5">Khoảng cách nan 60mm</td></tr>
                <tr class="bg-gray-50"><td class="p-3.5 font-bold">Thanh liên kết</td><td class="p-3.5">1000 x 90 x 20 mm</td><td class="p-3.5">03 thanh</td><td class="p-3.5">Chịu lực chính giữa cục gù</td></tr>
                <tr class="bg-white"><td class="p-3.5 font-bold">Cục gù chịu lực</td><td class="p-3.5">90 x 90 x 90 mm</td><td class="p-3.5">09 cục</td><td class="p-3.5">Gỗ keo đúc chịu nén cao</td></tr>
                <tr class="bg-gray-50"><td class="p-3.5 font-bold">Nan mặt đáy</td><td class="p-3.5">1200 x 90 x 20 mm</td><td class="p-3.5">03 thanh</td><td class="p-3.5">Thuận tiện xếp chồng pallet</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="tab-ispm15" data-tab-content="product-detail" class="py-8 hidden">
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 class="font-bold text-gray-900 mb-2">Quy Trình Sấy Nhiệt Heat Treatment (HT)</h4>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">Tâm gỗ đạt trên 56°C trong ít nhất 30 phút, đóng dấu mộc IPPC số VN-088 chuẩn kiểm dịch quốc tế kèm chứng thư xuất xưởng.</p>
          </div>
        </div>

        <div id="tab-shipping" data-tab-content="product-detail" class="py-8 hidden">
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h4 class="font-bold text-gray-900 mb-2">Khả Năng Xếp Lọt Container & Xe Tải</h4>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">Container 40ft HC chứa được 900 - 1000 pallet rỗng thành phẩm. Giao xe tải 5T (200 cái) trong 2 giờ tại Bình Dương và Đồng Nai.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;

  const output = head + getNavbar('products') + body + getFooter();
  fs.writeFileSync('chi-tiet-san-pham.html', output, 'utf8');
  console.log('Built chi-tiet-san-pham.html');
}

module.exports = { buildSanpham, buildChitiet };