dist_dir = dist
filename = tabswitcher.xpi

cleanup:
	rm -rf ${dist_dir}

package: cleanup
	mkdir ${dist_dir}
	zip -r -FS ./${dist_dir}/${filename} * \
		--exclude './dist/*' \
		--exclude './screenshots/*' \
		--exclude '*.git*'

# vim: set ts=4 sw=4 autoindent noexpandtab:
