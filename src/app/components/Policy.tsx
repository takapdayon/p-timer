type TimerProps = {
  openPolicy: boolean;
};

export const Policy = ({ openPolicy }: TimerProps) => {
  if (!openPolicy) return null;

  return (
    <>
      <div className="w-fill h-full rounded-lg p-4 shadow-np-shallow-pressed">
        <div className="mb-8">
          <h2 className="text-xl">プライバシーポリシー</h2>
          <p className="mt-4 text-sm">このサイトでは、Cloudflare Web Analyticsを利用しています。</p>
          <p className="mt-2 text-sm">
            収集されたデータは、匿名化された形で処理され、個人を特定する情報は含まれません。
          </p>
          <p className="mt-2 text-sm">
            Cloudflare Web Analyticsに関する詳細な情報は、
            <a
              className="inline-flex items-center text-sky-500"
              href="https://www.cloudflare.com/ja-jp/web-analytics/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflareのプライバシーポリシー
              <span className="i-material-symbols-arrow-outward-rounded" />
            </a>
            をご覧ください。
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl">開発者</h2>
          <p className="mt-4 text-sm">
            <a
              className="inline-flex items-center text-sky-500"
              href="https://x.com/takapdayon"
              target="_blank"
              rel="noopener noreferrer"
            >
              @taka p*2
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
