import { CalendarOutlined, DatabaseOutlined, DesktopOutlined, EditOutlined, FileZipOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import * as React from 'react'
import PageWrap from '~/components/component/PageWrap'
import './index.scss'
import { Area } from '@ant-design/plots';
import { apiGetdataStats } from './service'

export default function home() {
  const [homeCount, setHomeCount] = React.useState<any>({});
  const [data, setData] = React.useState<any>([])

  React.useEffect(() => {
    GetdataStats()
  }, []);

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    xAxis: {
      tickCount: 7,
    },
    meta: {
      value: { alias: '学习人次' },
    },
  };


  return (
    <div className='home'>
      <PageWrap>
        <div className='home-title'><span>数据统计与分析</span></div>
        <div className='home-numberofpeople'>
          <div className='numberofpeople-chunk'>
            <div className='chunk'>
              <div className='icon'><CalendarOutlined /></div>
              <div className='text'>
                <div className='number'>{homeCount.newplan_num || 0}</div>
                <div className='title'>总课程数</div>
              </div>
            </div>
            <Divider />
          </div>
          <div className='numberofpeople-chunk'>
            <div className='chunk'>
              <div className='icon' style={{ backgroundColor: '#7266ba' }}><DesktopOutlined /></div>
              <div className='text'>
                <div className='number'>{homeCount.exp_num || 0}</div>
                <div className='title'>总实验数</div>
              </div>
            </div>
            <Divider />
          </div>
          <div className='numberofpeople-chunk'>
            <div className='chunk'>
              <div className='icon' style={{ backgroundColor: '#23b7e5' }}><TeamOutlined /></div>
              <div className='text'>
                <div className='number'>{homeCount.class_num || 0}</div>
                <div className='title'>总班级数</div>
              </div>
            </div>
            <Divider />
          </div>
          <div className='numberofpeople-chunk'>
            <div className='chunk'>
              <div className='icon' style={{ backgroundColor: '#27C24C' }}><UserOutlined /></div>
              <div className='text'>
                <div className='number'>{homeCount.student || 0}</div>
                <div className='title'>学生人数</div>
              </div>
            </div>
            <Divider />
          </div>
        </div>

        <div className='home-data-analysis'>
          <div className='home-charts'>
            <Area {...config} />
          </div>
        </div>

        <div className='home-statistics'>
          <div className='statistics-chunk bg-blue'>
            <div className='statistics-title'><span>镜像统计</span><span className='title-right'>实时</span></div>
            <div className='statistics-number'>
              <div>
                <div className='num'>{homeCount.iso_num || 0}</div>
                <div className='text'><EditOutlined /><span className='text-span'>当前总镜像数</span></div>
              </div>
            </div>
          </div>
          <div className='statistics-chunk bg-aqua'>
            <div className='statistics-title'><span>视频统计</span><span className='title-right'>实时</span></div>
            <div className='statistics-number'>
              <div>
                <div className='num'>{homeCount.video_num || 0}</div>
                <div className='text'><DatabaseOutlined /><span className='text-span'>视频数量</span></div>
              </div>
              <div>
                {/* <div className='num'>{homeCount.dbsize || '0MB'}</div>
                <div className='text'><FilterOutlined /><span className='text-span'>占用空间</span></div> */}
              </div>
            </div>
          </div>
          <div className='statistics-chunk bg-purple'>
            <div className='statistics-title'><span>PDF统计</span><span className='title-right'>实时</span></div>
            <div className='statistics-number'>
              <div>
                <div className='num'>{homeCount.pdf_num || 0}</div>
                <div className='text'><FileZipOutlined /><span className='text-span'>PDF数量</span></div>
              </div>
              <div>
                {/* <div className='num'>{homeCount.attachsize || '0GB'}</div>
                <div className='text'><FilterOutlined /><span className='text-span'>附件大小</span></div> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrap>
    </div>
  )
  //获取统计数据
  async function GetdataStats() {
    const res: any = await apiGetdataStats({})
    if (res.code === 200) {
      res.data.student = res.data.total_num - res.data.teacher_num - res.data.manager_num
      if (res.data.play && res.data.play.exps && res.data.play.plans) {
        let play: any[] = []
        res.data.play.exps.map((item: any) => {
          res.data.play.plans.map((it: any) => {
            if (item.day == it.day) {
              play.push({ value: Number(item.expplay) + Number(it.planplay), time: item.day })
            }
          })
        })
        setData(play)
      }
      setHomeCount(res.data)
    }
  }
}