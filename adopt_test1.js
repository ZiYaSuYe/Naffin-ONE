  // 模拟API请求
  const mockAPI = {
    getAdoptionBatches: () => new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 'A2023', name: '2026年生态养殖批次', available: 15 },
            { id: 'B2024', name: '2027年生态养殖批次', available: 12 }
        ]), 800)
    }),

    getRetailBatches: (batchId) => new Promise(resolve => {
        const batches = {
            A2023: [
                { id: 'R001', name: '1月零售批次(有机认证)', limit: 5 },
                { id: 'R002', name: '2月零售批次(有机认证)', limit: 10},
                { id: 'R003', name: '3月零售批次(有机认证)', limit: 10},
                { id: 'R004', name: '4月零售批次(有机认证)', limit: 10},
                { id: 'R005', name: '5月零售批次(有机认证)', limit: 10},
            ],
            B2024: [
                { id: 'R006', name: '1月零售批次(有机认证)', limit: 8 },
                { id: 'R007', name: '2月零售批次(有机认证)', limit: 8 },
                { id: 'R008', name: '3月零售批次(有机认证)', limit: 8 },
                { id: 'R009', name: '4月零售批次(有机认证)', limit: 8 },
                { id: 'R010', name: '5月零售批次(有机认证)', limit: 8 },
                { id: 'R011', name: '6月零售批次(有机认证)', limit: 8 },
            ]
        }
        setTimeout(() => resolve(batches[batchId] || []), 500)
    })
}

// DOM元素
const adoptionSelect = document.getElementById('adoptionBatch')
const retailSelect = document.getElementById('retailBatch')

// 初始化认养批次
async function initAdoptionBatches() {
    adoptionSelect.classList.add('loading')
    const batches = await mockAPI.getAdoptionBatches()
    
    adoptionSelect.innerHTML = batches.map(batch => `
        <option value="${batch.id}" 
                data-available="${batch.available}">
            ${batch.name}
        </option>
    `).join('')
    
    adoptionSelect.classList.remove('loading')
}

// // 认养批次选择事件
adoptionSelect.addEventListener('change', async function() {
    if (!this.value) return
    
    retailSelect.disabled = true
    retailSelect.innerHTML = '<option value="">加载中...</option>'
    
    const batches = await mockAPI.getRetailBatches(this.value)
    
    retailSelect.innerHTML = batches.map(batch => `
        <option value="${batch.id}" 
                data-limit="${batch.limit}">
            ${batch.name}
        </option>
    `).join('') || '<option value="">无可用零售批次</option>'
    
    retailSelect.disabled = !batches.length
})

// 初始化
initAdoptionBatches()