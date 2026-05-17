import React from "react";
import { Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react";
import useMessagesPage from "./controller/useMessagesPage";

const MessagesPage: React.FC = () => {
  const { state, handlers } = useMessagesPage();
  const { data, selectedMessage, totalUnread, isLoadingPortfolios } = state;
  const { handleExpand, handleOpenMessage, handleCloseMessage, formatDate } = handlers;

  if (isLoadingPortfolios) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Messages</h1>
          <p className='text-sm text-on-surface-variant mt-1'>Contact messages from your portfolio visitors</p>
        </div>
        {totalUnread > 0 && (
          <div className='flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full'>
            <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
            <span className='text-sm font-medium text-primary'>{totalUnread} unread</span>
          </div>
        )}
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-3 py-24 text-center'>
          <div className='w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center'>
            <Mail size={24} className='text-on-surface-variant' />
          </div>
          <h3 className='font-medium text-on-surface'>No portfolios yet</h3>
          <p className='text-sm text-on-surface-variant max-w-xs'>Create and publish a portfolio to start receiving messages.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {data.map((portfolio) => (
            <div key={portfolio.portfolioId} className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
              {/* Portfolio row */}
              <button
                onClick={() => handleExpand(portfolio.portfolioId)}
                className='w-full flex items-center justify-between px-5 py-4 hover:bg-surface-container/50 transition-colors'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0'>
                    <Mail size={16} className='text-primary' />
                  </div>
                  <div className='text-left'>
                    <p className='font-medium text-on-surface text-sm'>{portfolio.portfolioName}</p>
                    <p className='text-xs text-on-surface-variant'>/{portfolio.portfolioSlug}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-on-surface-variant'>{portfolio.stats.total} total</span>
                    {portfolio.stats.unread > 0 && (
                      <span className='px-2 py-0.5 bg-primary text-on-primary text-xs font-bold rounded-full'>{portfolio.stats.unread} new</span>
                    )}
                  </div>
                  {portfolio.isExpanded ? (
                    <ChevronUp size={16} className='text-on-surface-variant' />
                  ) : (
                    <ChevronDown size={16} className='text-on-surface-variant' />
                  )}
                </div>
              </button>

              {/* Messages list */}
              {portfolio.isExpanded && (
                <div className='border-t border-outline-variant/20'>
                  {portfolio.isLoading ? (
                    <div className='flex items-center justify-center py-12'>
                      <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                    </div>
                  ) : portfolio.messages.length === 0 ? (
                    <div className='flex flex-col items-center gap-2 py-12 text-center'>
                      <MailOpen size={24} className='text-on-surface-variant/40' />
                      <p className='text-sm text-on-surface-variant'>No messages yet</p>
                    </div>
                  ) : (
                    <div className='divide-y divide-outline-variant/10'>
                      {portfolio.messages.map((message) => (
                        <button
                          key={message.id}
                          onClick={() => handleOpenMessage(message)}
                          className='w-full flex items-start gap-4 px-5 py-4 hover:bg-surface-container/30 transition-colors text-left'>
                          <div className='flex-shrink-0 mt-1.5'>
                            {message.status === "UNREAD" ? (
                              <div className='w-2 h-2 rounded-full bg-primary' />
                            ) : (
                              <div className='w-2 h-2 rounded-full bg-transparent' />
                            )}
                          </div>
                          <div className='w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 font-medium text-on-surface-variant text-sm'>
                            {message.name[0]?.toUpperCase()}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center justify-between gap-2 mb-0.5'>
                              <p
                                className={[
                                  "text-sm truncate",
                                  message.status === "UNREAD" ? "font-semibold text-on-surface" : "font-medium text-on-surface",
                                ].join(" ")}>
                                {message.name}
                              </p>
                              <span className='text-xs text-on-surface-variant flex-shrink-0'>{formatDate(message.createdAt)}</span>
                            </div>
                            <p className='text-xs text-on-surface-variant mb-1 truncate'>{message.email}</p>
                            <p
                              className={[
                                "text-xs truncate",
                                message.status === "UNREAD" ? "font-medium text-on-surface" : "text-on-surface-variant",
                              ].join(" ")}>
                              {message.subject}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selectedMessage && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={handleCloseMessage}>
          <div className='bg-surface rounded-2xl shadow-xl w-full max-w-lg p-6' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center gap-3 mb-5'>
              <div className='w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center font-semibold text-primary'>
                {selectedMessage.name[0]?.toUpperCase()}
              </div>
              <div>
                <p className='font-semibold text-on-surface text-sm'>{selectedMessage.name}</p>
                <a href={`mailto:${selectedMessage.email}`} className='text-xs text-primary hover:underline'>
                  {selectedMessage.email}
                </a>
              </div>
              <span className='ml-auto text-xs text-on-surface-variant'>{formatDate(selectedMessage.createdAt)}</span>
            </div>

            <h3 className='font-semibold text-on-surface mb-3'>{selectedMessage.subject}</h3>

            <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>{selectedMessage.message}</p>

            <div className='flex items-center justify-between'>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-medium rounded-xl hover:opacity-90 transition-opacity'>
                <Mail size={14} />
                Reply via Email
              </a>
              <button onClick={handleCloseMessage} className='text-sm text-on-surface-variant hover:text-on-surface transition-colors'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
