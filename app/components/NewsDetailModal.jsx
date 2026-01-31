import React from 'react';

export default function NewsDetailModal({ visible, news, loading, onClose }) {
  if (!visible) return null;

  return (
    <>
      <div className="van-overlay" style={{ zIndex: 100 }} onClick={onClose}></div>
      <div
        className="van-popup van-popup--bottom van-popup--round"
        style={{ zIndex: 101, height: '80%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}
      >
        <div className="van-nav-bar van-hairline--bottom" style={{ flexShrink: 0, backgroundColor: 'var(--bg)' }}>
            <div className="van-nav-bar__content">
                <div className="van-nav-bar__title" style={{ color: 'var(--text)' }}>快讯详情</div>
                <div className="van-nav-bar__right" onClick={onClose}>
                    <span className="van-nav-bar__text" style={{ color: 'var(--primary)' }}>关闭</span>
                </div>
            </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--bg)' }}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                    <div className="van-loading van-loading--circular">
                        <span className="van-loading__spinner van-loading__spinner--circular">
                             <svg className="van-loading__circular" viewBox="25 25 50 50">
                                <circle cx="50" cy="50" r="20" fill="none"></circle>
                             </svg>
                        </span>
                    </div>
                </div>
            ) : (
                news ? (
                     <div className="news-detail-content">
                         <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: 'var(--text)' }}>{news.title}</h2>
                         <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 20 }}>{news.showTime}</div>
                         <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: news.body }}></div>
                     </div>
                ) : (
                     <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-secondary)' }}>
                        未找到内容
                     </div>
                )
            )}
        </div>
      </div>
    </>
  );
}
