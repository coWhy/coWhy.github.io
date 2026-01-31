import React from 'react';

export default function FundDetailModal({
  visible,
  fund,
  onClose,
  onDelete,
  isEditing,
  setIsEditing,
  editAmount,
  setEditAmount,
  editReturn,
  setEditReturn,
  onSavePosition
}) {
  if (!visible || !fund) return null;

  const formatNumber = (value) => {
    if (value === null || value === undefined || value === '') return '0.00';
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(num)) return '0.00';
    const fixed = num.toFixed(2);
    const parts = fixed.split('.');
    const integer = parts[0];
    const decimal = parts[1] || '00';
    const sign = integer.startsWith('-') ? '-' : '';
    const intAbs = sign ? integer.slice(1) : integer;
    const intWithCommas = intAbs.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + intWithCommas + '.' + decimal;
  };

  const gszzl = Number(fund.gszzl || 0);
  const holdingReturnNum = Number(fund.holdingReturn || 0);
  const todayReturnNum = Number(fund.todayReturn || 0);

  return (
    <>
      <div className="van-overlay" style={{ zIndex: 100 }} onClick={onClose}></div>
      <div
        className="van-popup van-popup--bottom van-popup--round"
        style={{ zIndex: 101, height: '80%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}
      >
        <div className="van-nav-bar van-hairline--bottom" style={{ flexShrink: 0, backgroundColor: 'var(--bg)' }}>
            <div className="van-nav-bar__content">
                <div className="van-nav-bar__title van-ellipsis" style={{ color: 'var(--text)' }}>{fund.name}</div>
                <div className="van-nav-bar__right" onClick={onClose} style={{ cursor: 'pointer' }}><span className="van-nav-bar__text" style={{ color: 'var(--primary)' }}>关闭</span></div>
            </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>基金代码</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '2px' }}>{fund.code}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>估值时间</div>
                  <div style={{ fontSize: '12px', marginTop: '2px' }}>{fund.gztime || '--'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>单位净值</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '2px' }}>{fund.dwjz || '--'}</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>估值净值</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '2px' }}>{fund.gsz || '--'}</div>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>估算涨幅</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '2px', color: gszzl > 0 ? '#ee0a24' : (gszzl < 0 ? '#07c160' : 'var(--text-secondary)') }}>
                    {Number.isFinite(gszzl) ? `${gszzl > 0 ? '+' : ''}${gszzl}%` : '--'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>我的持仓</div>
                {!isEditing && (
                  <span onClick={() => setIsEditing(true)} style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer' }}>修改</span>
                )}
              </div>
              {isEditing ? (
                <div>
                  <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '4px' }}>持有金额</div>
                    <div className="van-field__body" style={{ background: '#1f1f23', borderRadius: '8px', padding: '8px 10px', position: 'relative', paddingRight: editAmount ? '32px' : '10px' }}>
                      <input
                        type="number"
                        className="van-field__control"
                        value={editAmount}
                        onChange={e => setEditAmount(e.target.value)}
                      placeholder="请输入金额"
                      style={{ color: 'var(--text)', fontSize: '12px' }}
                      />
                      {editAmount && (
                        <span
                          onClick={() => setEditAmount('')}
                          style={{
                            position: 'absolute',
                            right: '6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#3a3a3c',
                            color: '#c8c9cc',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '4px' }}>持有收益</div>
                    <div className="van-field__body" style={{ background: '#1f1f23', borderRadius: '8px', padding: '8px 10px', position: 'relative', paddingRight: editReturn ? '32px' : '10px' }}>
                      <input
                        type="number"
                        className="van-field__control"
                        value={editReturn}
                        onChange={e => setEditReturn(e.target.value)}
                        placeholder="请输入收益"
                        style={{ color: 'var(--text)', fontSize: '12px' }}
                      />
                      {editReturn && (
                        <span
                          onClick={() => setEditReturn('')}
                          style={{
                            position: 'absolute',
                            right: '6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#3a3a3c',
                            color: '#c8c9cc',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                    <button
                      className="van-button van-button--default van-button--small van-button--block"
                      onClick={() => setIsEditing(false)}
                      style={{ flex: 1, background: 'transparent', borderColor: 'var(--border)', color: 'var(--text)' }}
                    >
                      取消
                    </button>
                    <button
                      className="van-button van-button--primary van-button--small van-button--block"
                      onClick={onSavePosition}
                      style={{ flex: 1 }}
                    >
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>持有金额</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '4px' }}>{formatNumber(fund.holdingAmount || 0)}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>持有收益</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '4px', color: holdingReturnNum > 0 ? '#ee0a24' : (holdingReturnNum < 0 ? '#07c160' : 'var(--text-secondary)') }}>
                      {Number.isFinite(holdingReturnNum) ? `${holdingReturnNum > 0 ? '+' : ''}${formatNumber(holdingReturnNum)}` : formatNumber(fund.holdingReturn || 0)}
                  </div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>最新收益</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, marginTop: '4px', color: todayReturnNum > 0 ? '#ee0a24' : (todayReturnNum < 0 ? '#07c160' : 'var(--text-secondary)') }}>
                      {Number.isFinite(todayReturnNum) ? `${todayReturnNum > 0 ? '+' : ''}${formatNumber(todayReturnNum)}` : formatNumber(fund.todayReturn || 0)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: 'var(--card)', borderRadius: '12px', padding: '12px 14px', marginBottom: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text)' }}>前10重仓股票</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>涨跌幅 / 占比</div>
              </div>
              {fund.holdings && fund.holdings.length > 0 ? (
                <div style={{ marginTop: '4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {fund.holdings.map((stock, idx) => {
                    const changeNum = typeof stock.change === 'number' ? stock.change : Number(stock.change);
                    const hasChange = Number.isFinite(changeNum);
                    const changeColor = !hasChange ? '#f5f5f5' : changeNum > 0 ? '#ee0a24' : changeNum < 0 ? '#07c160' : '#f5f5f5';
                    const changeText = hasChange ? `${changeNum > 0 ? '+' : ''}${changeNum.toFixed(2)}%` : '--';
                    return (
                      <div key={idx} style={{ background: '#18181b', borderRadius: '10px', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '12px', color: '#f5f5f5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stock.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ padding: '2px 8px', borderRadius: '999px', background: 'rgba(0,0,0,0.35)', fontSize: '11px', color: changeColor, minWidth: '64px', textAlign: 'center' }}>
                            {changeText}
                          </div>
                          <div style={{ fontSize: '12px', color: '#8ab4ff' }}>{stock.weight}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '12px 0' }}>暂无持仓数据</div>
              )}
            </div>

             <div style={{ padding: '20px 16px' }}>
                <button
                  className="van-button van-button--danger van-button--block van-button--round"
                  onClick={() => onDelete(fund.code)}
                >
                    <div className="van-button__content">
                        <span className="van-button__text">删除此基金</span>
                    </div>
                </button>
             </div>
        </div>
      </div>
    </>
  );
}
