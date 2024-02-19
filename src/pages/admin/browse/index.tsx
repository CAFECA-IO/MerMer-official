import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Layout from '../../../components/mermer_admin/layout/admin_layout'
import Head from 'next/head';
import KmCardDisplay from '../../../components/mermer_admin/km_card/km_card_display';
import Pagination from '../../../components/mermer_admin/pagination/pagination';
import SearchBar from '../../../components/mermer_admin/search_bar/SearchBar';
import DraftOrPublishTags from '../../../components/mermer_admin/draft_or_publish_tag/draft_or_publish_tags';
import MerMerButton from '../../../components/mermer_button/mermer_button';
import { IAllKmMeta, IKmMeta } from '../../../interfaces/km';
import useWindowDimensions from '../../../lib/hooks/use_window_dimensions';
import { useAlerts } from '../../../contexts/alert_context';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
// type Props = {}


// Till (20240316 - Murky) 這個function是用來計算每個頁面要顯示多少個卡片
// 可以根據螢幕高度來決定要顯示多少個卡片，目前只會回傳3
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCardsDisplayPerPage = (screenHeight: number | undefined | null): number => {
  // if (screenHeight && screenHeight >= 960) return 4
  return 3
}

export default function index() {
  const defaultKmAllMeta: IAllKmMeta = {
    drafts: {
      publishStatus: 'Drafts',
      kmMetas: []
    },
    published: {
      publishStatus: 'Published',
      kmMetas: []
    }
  }
  // Alert context
  const { addAlert, clearAlerts } = useAlerts();
  function emitAlert(severity: 'error' | 'success', message: string) {
    addAlert({
      severity, message, timeout: 3000, handleDismiss: () => {
        setTimeout(() => {
          clearAlerts();
        }, 2000);
      }
    });
  }

  const router = useRouter();

  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")

  // Info (20240316 - Murky) 這個hook是用來取得螢幕的寬度
  // 可以用 {height, width} = useWindowDimensions() 來取得螢幕的高度和寬度
  const { width: screenWidth } = useWindowDimensions();
  const cardsRenderPerPage = getCardsDisplayPerPage(screenWidth);

  const [kmAllMeta, setKmAllMeta] = useState<IAllKmMeta>(defaultKmAllMeta)
  const [renderedKmMeta, setRenderedKmMeta] = useState<IKmMeta[]>([])
  const [activePublishStatus, setActivePublishStatus] = useState<'drafts' | 'published'>(
    () => {
      return 'drafts' as 'drafts' | 'published'
      // 記得上次是在draft還是published, 目前有bug暫時不使用
      // if (typeof localStorage === 'undefined') return 'drafts'
      // const savedStatus = localStorage.getItem('activePublishStatus');
      // if (!savedStatus) return 'drafts'
      // return savedStatus === 'drafts' ? 'drafts' : 'published';
    }
  );

  // Info (20240316 - Murky) 下面這個useEffect是用來取得所有的KM的metadata
  useEffect(() => {
    //get cookies user email
    let userEmail = Cookies.get('userEmail');

    if (!userEmail) {
      return;
    }

    userEmail = decodeURIComponent(userEmail) // decode %40 to @

    const fetchAllKmMeta = async () => {
      const response = await fetch(`/api/kms/kmMetas/${userEmail}`);
      if (!response.ok) return null;
      const json = await response.json() as IAllKmMeta;
      setKmAllMeta(json);
    };
    fetchAllKmMeta();

  }, []);

  // Info (20240316 - Murky) 下面這個useEffect是用來當activePublishStatus改變時，重新render KM的metadata, 可以在draft和publish之間切換
  useEffect(() => {
    // 把draft或publish的狀態存在localstorage
    // localStorage.setItem('activePublishStatus', activePublishStatus);
    setRenderedKmMeta(kmAllMeta[activePublishStatus].kmMetas || []);
    setActivePage(1);
  }, [activePublishStatus]);


  // Info (20240316 - Murky) 下面這個useEffect是用來當search改變時，重新render KM的metadata, 可以在draft和publish之間切換
  useEffect(() => {
    if (!search) {
      setRenderedKmMeta(kmAllMeta[activePublishStatus].kmMetas || []);
      return;
    }
    const filteredKmMeta = kmAllMeta[activePublishStatus].kmMetas?.filter(km => {
      const isRendered: boolean = (
        km.title.toLowerCase().includes(search.toLowerCase()) ||
        km.categories.some(category => category.label.toLowerCase().includes(search.toLowerCase())) ||
        km.topic.name.toLowerCase().includes(search.toLowerCase())
      )
      return isRendered
    });
    setRenderedKmMeta(filteredKmMeta || []);
  }, [search, kmAllMeta, activePublishStatus]);

  // 新增文章
  const addNewKm = async () => {
    const response = await fetch('/api/kms', {
      method: 'POST',
    });

    if (!response.ok) {
      emitAlert('error', "Can't add new KM");
      return null;
    }

    const { kmId } = await response.json();
    router.push(`/admin/edit/${kmId}`);
  }
  return (
    <>
      <Head>
        <title>MerMer Admin - KM</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="canonical" href="https://mermer.com.tw/" />
      </Head>
      <Layout>
        <div className='flex w-[500px] flex-col gap-6 px-10 py-6 font-Dosis md:w-[640px] lg:w-[768px] xl:w-[1024px]'>
          <h4 className='m-0 p-0 text-2xl font-bold'>Knowledge Management</h4>
          <div className='flex w-full justify-between'>
            <DraftOrPublishTags kmAllMetas={kmAllMeta} activePublishStatus={activePublishStatus} setActivePublishStatus={setActivePublishStatus} />
            {/* 最後回來改search */}
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className='flex w-full items-center justify-between'>
            <span>{renderedKmMeta.length} Articles</span>
            {/* 新增新的文章 */}
            <MerMerButton
              className='flex size-[44px] items-center justify-center rounded-full'
              onClick={addNewKm}
            >
              <Image
                src="/elements/plus.svg"
                width={16}
                height={16}
                alt="Plus sign"
              />
            </MerMerButton>
          </div>
          <KmCardDisplay kmCards={renderedKmMeta} cardsRenderPerPage={cardsRenderPerPage} activePage={activePage} kmAllMeta={kmAllMeta} setKmAllMeta={setKmAllMeta} />
          <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={Math.ceil((renderedKmMeta.length) / cardsRenderPerPage)}></Pagination>
        </div>
      </Layout>
    </>
  )
}