import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RepositoryList from '@/components/search/RepositoryList.vue'
import { useSearchStore } from '@/stores/search-store'

describe('RepositoryList', () => {
  let wrapper
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSearchStore()
  })

  it('displays loading state', async () => {
    store.state.isLoading = true
    wrapper = mount(RepositoryList)
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading repositories...')
  })

  it('displays error message', async () => {
    store.state.error = 'Test error'
    wrapper = mount(RepositoryList)
    expect(wrapper.text()).toContain('Test error')
  })

  it('displays repositories for single language', async () => {
    store.state.repositories = {
      JavaScript: [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }]
    }
    wrapper = mount(RepositoryList)
    expect(wrapper.findAll('.repo-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('Repo 1')
    expect(wrapper.text()).toContain('Repo 2')
    expect(wrapper.find('.language-tag').exists()).toBe(false)
  })

  it('displays repositories for multiple languages', async () => {
    store.state.repositories = {
      JavaScript: [{ id: 1, name: 'JS Repo' }],
      Python: [{ id: 2, name: 'Python Repo' }]
    }
    wrapper = mount(RepositoryList)
    expect(wrapper.findAll('.language-tag')).toHaveLength(2)
    expect(wrapper.text()).toContain('JavaScript')
    expect(wrapper.text()).toContain('Python')
    expect(wrapper.text()).toContain('JS Repo')
    expect(wrapper.text()).not.toContain('Python Repo') // Only first language is shown initially
  })

  it('changes active language when tag is clicked', async () => {
    store.state.repositories = {
      JavaScript: [{ id: 1, name: 'JS Repo' }],
      Python: [{ id: 2, name: 'Python Repo' }]
    }
    wrapper = mount(RepositoryList)
    await wrapper.find('.language-tag:nth-child(2)').trigger('click')
    expect(wrapper.text()).toContain('Python Repo')
    expect(wrapper.text()).not.toContain('JS Repo')
  })

  it('loads more repositories when "Load More" is clicked', async () => {
    store.state.hasMoreData = true
    store.loadMoreRepositories = jest.fn()
    wrapper = mount(RepositoryList)
    await wrapper.find('.load-more-btn').trigger('click')
    expect(store.loadMoreRepositories).toHaveBeenCalled()
  })
})