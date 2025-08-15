import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit {
  courseContent: any;
  selectedLesson: any;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    if (courseId) {
      this.courseService.getCourseContent(courseId).subscribe(data => {
        this.courseContent = data;
      });
    }
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
    
    if (lesson.videoUrl) {
      const vimeoUrl = `https://player.vimeo.com/video/${lesson.videoUrl}`;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vimeoUrl);
    } else {
      this.safeVideoUrl = null;
    }
  }
}